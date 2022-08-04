const db = require('../modules/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// login
exports.login = async (req, res) => {
    const { email, password, role } = req.body;

    // check the role of the user
    if (role === 'admin') {
        // check if email exists in admins table
        const adminRow = await db.query('SELECT * FROM admins WHERE admin_email = $1', [email]);
        if (adminRow.rows.length === 0)
            return res.status(400).json({ mssg: 'Email does not exist in admins table' });
        
        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, adminRow.rows[0].admin_password);
        if (!isPasswordCorrect)
            return res.status(400).json({ mssg: 'Password is incorrect' });

        // create token
        const token = jwt.sign({
            id: adminRow.rows[0].admin_id,
            username: adminRow.rows[0].admin_name,
            email: adminRow.rows[0].admin_email,
            role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // return token
        return res.status(200).json({ token });

    } else if (role === 'student') {
        // check if email exists in students table
        const studentRow = await db.query('SELECT * FROM students WHERE student_email = $1', [email]);
        if (studentRow.rows.length === 0)
            return res.status(400).json({ mssg: 'Email does not exist in students table' });

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, studentRow.rows[0].student_password);
        if (!isPasswordCorrect)
            return res.status(400).json({ mssg: 'Password is incorrect' });

        // create token
        const token = jwt.sign({
            id: studentRow.rows[0].student_id,
            username: studentRow.rows[0].student_name,
            email: studentRow.rows[0].student_email,
            gender: studentRow.rows[0].student_gender,
            avatar_url: studentRow.rows[0].student_avatar_url,
            school_id: studentRow.rows[0].student_school_id,
            role: 'student' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // return token
        return res.status(200).json({ token });
    } else if (role === 'school') {
        // check if email exists in schools table
        const schoolRow = await db.query('SELECT * FROM schools WHERE school_admin_email = $1', [email]);
        if (schoolRow.rows.length === 0)
            return res.status(400).json({ mssg: 'Email does not exist in schools table' });

        // check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, schoolRow.rows[0].school_admin_password);
        if (!isPasswordCorrect)
            return res.status(400).json({ mssg: 'Password is incorrect' });

        // create token
        const token = jwt.sign({
            id: schoolRow.rows[0].school_id,
            name: schoolRow.rows[0].school_name,
            avatar_url: schoolRow.rows[0].school_avatar_url,
            teachers_nember: schoolRow.rows[0].school_teachers_number,
            phone: schoolRow.rows[0].school_phone,
            desc: schoolRow.rows[0].school_desc,
            facebook: schoolRow.rows[0].school_facebook,
            url: schoolRow.rows[0].school_url,
            open_at: schoolRow.rows[0].open_at,
            close_at: schoolRow.rows[0].close_at,
            paid: schoolRow.rows[0].school_paid === 'true' ? true : false,
            location: 1,
            admin: {
                name: schoolRow.rows[0].school_admin_name,
                email: schoolRow.rows[0].school_admin_email,
            },
            role: 'school' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // return token
        return res.status(200).json({ token });
    } else
        return res.status(400).json({ mssg: 'Invalid role please enter a valid role' });
};
