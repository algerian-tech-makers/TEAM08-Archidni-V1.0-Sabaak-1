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


// check password for student
exports.checkPassword = async (req, res) => {
    try {
        // get body data
        const { student_email, student_password } = req.body;
        // get student by email
        const student = await db.query(`SELECT * FROM students WHERE student_email = $1`, [student_email]);
        // check password
        const isPasswordValid = await bcrypt.compare(student_password, student.rows[0].student_password);
        // return response
        if (isPasswordValid)
            return res.status(200).json({
                mssg: "Password is correct"
            });
        else
            return res.status(400).json({
                error: "Password is incorrect"
            });
    } catch (err) {
        return res.status(500).json({
            error: err.message
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
        const newStudent = await db.query(`INSERT INTO public.students
        (student_name, student_email, student_password, student_gender, student_avatar_url, student_school_id)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
        [student_name, student_email, hashedPassword, student_gander, student_avatar_url, 1]);
        // return response
        return res.status(200).json({
            mssg: "Student added successfully", 
            student: {
                student_id: newStudent.rows[0].student_id,
                student_name: newStudent.rows[0].student_name,
                student_email: newStudent.rows[0].student_email,
                student_gander: newStudent.rows[0].student_gander,
                student_avatar_url: newStudent.rows[0].student_avatar_url,
            }
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
        const { student_name, student_email, student_password, student_gender, student_avatar_url } = req.body;
        // hash password
        const hashedPassword = await bcrypt.hash(student_password, 10);
        // update student in database
        const updatedStudent = await db.query(`UPDATE public.students
        SET student_name = $1, student_email = $2, student_password = $3, student_gender = $4, student_avatar_url = $5
        WHERE student_id = $6 RETURNING *`, 
        [student_name, student_email, hashedPassword, student_gender, student_avatar_url, req.params.id]);
        // return response
        return res.status(200).json({
            mssg: "Student updated successfully",
            student: {
                student_id: req.params.id,
                student_name: updatedStudent.rows[0].student_name,
                student_email: updatedStudent.rows[0].student_email,
                student_gander: updatedStudent.rows[0].student_gander,
                student_avatar_url: updatedStudent.rows[0].student_avatar_url,
            }
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};


// delete student from database by id or email
exports.deleteStudent = async (req, res) => {
    try {
        // get body data
        const { student_email, id } = req.body;
        let state;
        // check if id or email is provided
        if (id) {
            // delete student by id
            state = await db.query(`DELETE FROM public.students WHERE student_id = $1 RETURNING *`, [id]);
        } else if (student_email) {
            // delete student by email
            state = await db.query(`DELETE FROM public.students WHERE student_email = $1 RETURNING *`, [student_email]);
        } else {
            // return error
            return res.status(400).json({
                error: "Please provide student_email or student_id"
            });
        }
        // return response
        return res.status(200).json({
            mssg: (state.rows.length == 1) ? "Student deleted successfully" : "Student not found"
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};
