const db = require('../modules/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// get all students
exports.getAllStudents = async (req, res) => {
    try {
        // get all students
        const students = await db.query(`
        SELECT student_id, student_school_id, student_gender, student_name, student_email, student_avatar_url
        FROM public.students;
        `);
        // return response
        return res.status(200).json(students.rows);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// get student by id
exports.getStudentById = async (req, res) => {
    try {
        // get student by id
        const student = await db.query(`
        SELECT student_id, student_school_id, student_gender, student_name, student_email, student_avatar_url 
        FROM students WHERE student_id = $1`, [req.params.id]);
        // return response
        if (student.rows.length == 1)
            return res.status(200).json(student.rows);
        else
            return res.status(400).json({
                error: "Student not found id: " + req.params.id
            });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};


// update student by id
exports.updateStudentById = async (req, res) => {
    // get token from body
    const { token } = req.body;

    // if token is not provided
    if (!token) 
        return res.status(400).json({ mssg: 'Please provide a token with role student or admin' });

    // get role from token
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }

    // if token is not provided
    if (decodedToken.role != 'student' && decodedToken.role != 'admin')
        return res.status(400).json({ mssg: 'Please provide a token with role student or admin' });

    try {
        // get student id from body
        const { id } = req.body;

        // if student id is not provided
        if (!id)
            return res.status(400).json({ mssg: 'Please provide a student id' });

        // check if student id is the same in the token if token with role student
        if (decodedToken.role == 'student' && decodedToken.id != id)
            return res.status(400).json('token student id is not the same as student id');
        
        // check if student exists
        try {
            await db.query(`SELECT student_id FROM students WHERE student_id = $1`, [id]);
        } catch (err) {
            return res.status(500).json({ mssg: 'Student not found' });
        }
        
        // get all the needed data from body to update student
        const { name, email, password } = req.body;

        // create query
        let query = `UPDATE students SET `;

        // if name is provided
        if (name)
            query += `student_name = '${name}', `;
        // if email is provided
        if (email)
            query += `student_email = '${email}', `;
        // if password is provided
        if (password)
            query += `student_password = '${password}', `;
        // remove last comma
        query = query.slice(0, -2);
        // add where clause
        query += ` WHERE student_id = ${id} `;

        // update student
        try {
            const updatedStudent = await db.query(query + `RETURNING *;`);
            // return response as token
            const token = jwt.sign({
                id: updatedStudent.rows[0].student_id,
                username: updatedStudent.rows[0].student_name,
                email: updatedStudent.rows[0].student_email,
                gender: updatedStudent.rows[0].student_gender,
                avatar_url: updatedStudent.rows[0].student_avatar_url,
                school_id: updatedStudent.rows[0].student_school_id,
                role: 'student'
            }, process.env.JWT_SECRET,
                { expiresIn: '7d' });
            return res.status(200).json({ token });
        } catch (err) {
            return res.status(500).json({
                error: 'please provide at the least one field to update'
            });
        }

    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};
