const db = require('../modules/db');
const bcrypt = require('bcrypt');


// get all students
exports.getAllStudents = async (req, res) => {
    try {
        // get all students
        const students = await db.query(`SELECT * FROM students`);
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
        const student = await db.query(`SELECT * FROM students WHERE id = $1`, [req.params.id]);
        // return response
        return res.status(200).json(student.rows[0]);
    } catch (err) {
        return res.status(500).json({
            error: "Student not found id: " + req.params.id
        });
    }
};


// get student by email address
exports.getStudentByEmail = async (req, res) => {
    try {
        // get student by email address
        const student = await db.query(`SELECT * FROM students WHERE email = $1`, [req.params.email]);
        // return response
        return res.status(200).json(student.rows[0]);
    } catch (err) {
        return res.status(500).json({
            error: "Student not found email: " + req.params.email
        });
    }
};


// check password for student
exports.checkPassword = async (req, res) => {
    try {
        // get student by email address
        const student = await db.query(`SELECT * FROM students WHERE email = $1`, [req.params.email]);
        // check password
        const isValid = await bcrypt.compare(req.params.password, student.rows[0].password);
        // return response
        return res.status(200).json({
            isValid: isValid
        });
    } catch (err) {
        return res.status(500).json({
            error: "Student not found email: " + req.params.email
        });
    }
}


// add student to database
exports.addStudent = async (req, res) => {
    try {
        // get body data
        const { student_name, student_email, student_password, student_gander, student_avatar_url } = req.body;
        // hash password
        const hashedPassword = await bcrypt.hash(student_password, 10);
        // add student to database
        await db.query(`INSERT INTO public.students
        (student_gender, student_name, student_email, student_password, student_avatar_url)
        VALUES ($1, $2, $3, $4, $5)`, [student_gander, student_name, student_email, hashedPassword, student_avatar_url]);
        // return response
        return res.status(200).json({
            mssg: "Student added successfully"
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

// update student in database
exports.updateStudent = async (req, res) => {
    try {
        // get body data
        const { student_name, student_email, student_password, student_gander, student_avatar_url } = req.body;
        // hash password
        const hashedPassword = await bcrypt.hash(student_password, 10);
        // update student in database
        await db.query(`UPDATE public.students
        SET student_name = $1, student_email = $2, student_password = $3, student_gander = $4, student_avatar_url = $5
        WHERE id = $6`, [student_name, student_email, hashedPassword, student_gander, student_avatar_url, req.params.id]);
        // return response
        return res.status(200).json({
            mssg: "Student updated successfully"
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};


// delete student from database
exports.deleteStudentById = async (req, res) => {
    try {
        // delete student from database
        await db.query(`DELETE FROM public.students WHERE student_id = $1`, [req.params.id]);
        // return response
        return res.status(200).json({
            mssg: "Student deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};


// delete student by email from database
exports.deleteStudentByEmail = async (req, res) => {
    try {
        // delete student from database
        await db.query(`DELETE FROM public.students WHERE student_email = $1`, [req.params.email]);
        // return response
        return res.status(200).json({
            mssg: "Student deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};
