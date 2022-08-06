const db = require('../modules/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.signup = async (req, res) => {
    // get role from req.body
    const { role } = req.body;

    if (role === 'admin') {
        // get token from body
        let { token } = req.body;

        // check if token exists
        if (!token)
            return res.status(400).json({ mssg: 'Token is required' });

        // check token
        const tokenCheck =  virifyToken(token, 'admin');
        if (tokenCheck)
            return res.status(400).json(tokenCheck);

        // get data from body
        const { email, password, username } = req.body;

        // if email is empty
        if (!email)
            return res.status(400).json({ mssg: 'Email is required' });
        // regex for email
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email))
            return res.status(400).json({ mssg: 'Plese enter a valid email' });
        // if password is empty
        if (!password)
            return res.status(400).json({ mssg: 'Password is required' });
        if (password.length < 6)
            return res.status(400).json({ mssg: 'Password can not be less than 6 characters' });
        // if username is empty
        if (!username)
            return res.status(400).json({ mssg: 'Username is required' });
        // if username is less than 3 characters
        if (username.length < 3)
            return res.status(400).json({ mssg: 'Username can not be less than 3 characters' });

        // check if email exists in admins table
        const adminRow = await db.query('SELECT * FROM admins WHERE admin_email = $1', [email]);
        if (adminRow.rows.length > 0)
            return res.status(400).json({ mssg: 'Email already exists in admins table' });
        
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert new admin
        const newAdmin = await db.query('INSERT INTO admins (admin_email, admin_password, admin_name) VALUES ($1, $2, $3) RETURNING *',
        [email, hashedPassword, username]);

        // create token
        token = jwt.sign({
            id: newAdmin.rows[0].admin_id,
            username: newAdmin.rows[0].admin_name,
            email: newAdmin.rows[0].admin_email,
            role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // return token
        return res.status(200).json({ token });

    } else if (role === 'student') {
        // get data from body
        const { email, password, username, gender } = req.body;

        // check if email password username and gender exist
        if (!email)
            return res.status(400).json({ mssg: 'Please provide an email' });
        // regex for email
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(email))
            return res.status(400).json({ mssg: 'Please provide a valid email' });
        if (!password)
            return res.status(400).json({ mssg: 'Please provide a password' });
        // if password is less than 8 characters
        if (password.length < 8)
            return res.status(400).json({ mssg: 'Password must be at least 8 characters' });
        if (!username)
            return res.status(400).json({ mssg: 'Please provide a username' });
        // if username hase less than 3 characters
        if (username.length < 3)
            return res.status(400).json({ mssg: 'Username must be at least 3 characters' });
        if (!gender)
            return res.status(400).json({ mssg: 'Please provide a gender' });
        // if gender is not male or female
        if (gender !== 'male' || gender !== 'female')
            return res.status(400).json({ mssg: 'Gender can be male or female' });

        // check if email exists in students table
        const studentRow = await db.query('SELECT * FROM students WHERE student_email = $1', [email]);

        if (studentRow.rows.length > 0)
            return res.status(400).json({ mssg: 'Email already exists in students table' });
        
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert new student
        const newStudent = await db.query('INSERT INTO students (student_email, student_password, student_name, student_gender, student_school_id) VALUES ($1, $2, $3, $4, 1) RETURNING *',
        [email, hashedPassword, username, gender]);

        // create token
        const token = jwt.sign({
            id: newStudent.rows[0].student_id,
            username: newStudent.rows[0].student_name,
            email: newStudent.rows[0].student_email,
            gender: newStudent.rows[0].student_gender,
            avatar_url: newStudent.rows[0].student_avatar_url,
            school_id: newStudent.rows[0].student_school_id,
            role: 'student' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // return token
        return res.status(200).json({ token });

    } else if (role === 'school') {
        // get data from body
        const { phone, admin_name, admin_password, admin_email, school_name } = req.body;

        // check if phone admin_name admin_password admin_email school_name exist
        if (!phone)
            return res.status(400).json({ mssg: 'Please provide a phone number' });
        if (phone) {
            const phoneRegex = /^0[0-9][5|6|7]{8}$/;
            if (!phoneRegex.test(phone))
                return res.status(400).json({ mssg: 'Please provide a valid phone number' });
        }
        if (!admin_name)
            return res.status(400).json({ mssg: 'Please provide an admin_name' });
        if (admin_name.length < 3)
            return res.status(400).json({ mssg: 'Admin_name must be at least 3 characters' });
        if (!admin_password)
            return res.status(400).json({ mssg: 'Please provide an admin_password' });
        if (admin_password.length < 8)
            return res.status(400).json({ mssg: 'Admin_password must be at least 8 characters' });
        if (!admin_email)
            return res.status(400).json({ mssg: 'Please provide an admin_email' });
        // regex for email
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(admin_email))
            return res.status(400).json({ mssg: 'Please provide a valid email' });
        if (!school_name)
            return res.status(400).json({ mssg: 'Please provide a school_name' });
        if (school_name.length < 10)
            return res.status(400).json({ mssg: 'School_name must be at least 10 characters' });

        // check if email exists in students table
        const schoolRow = await db.query('SELECT * FROM schools WHERE school_admin_email = $1', [admin_email]);

        if (schoolRow.rows.length > 0)
            return res.status(400).json({ mssg: 'Email already exists in schools table' });
        
        // hash password
        const hashedPassword = await bcrypt.hash(admin_password, 10);

        // insert new school
        const newSchool = await db.query(`
            INSERT INTO schools (school_phone, school_admin_name, school_admin_email, school_admin_password, school_name)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [phone, admin_name, admin_email, hashedPassword, school_name]);
        
        // create token
        const token = jwt.sign({
            id: newSchool.rows[0].school_id,
            name: newSchool.rows[0].school_name,
            phone: newSchool.rows[0].school_phone,
            admin: {
                name: newSchool.rows[0].school_admin_name,
                email: newSchool.rows[0].school_admin_email,
            }}, process.env.JWT_SECRET,
            { expiresIn: '1d' });

        // return token
        return res.status(200).json({ token });

    } else 
        return res.status(400).json({ mssg: 'Invalid role please enter a valid role' });
};


const virifyToken = (token, role) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== role)
            return { mssg: 'Token is not valid for this role: ' + role };
    } catch (err) {
        return { mssg: 'Token is not valid' };
    }
};
