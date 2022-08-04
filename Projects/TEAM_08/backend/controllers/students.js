const db = require('../modules/db');
const bcrypt = require('bcrypt');


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
