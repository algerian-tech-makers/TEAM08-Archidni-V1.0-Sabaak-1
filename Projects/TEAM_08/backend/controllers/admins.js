const db = require('../modules/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.updateAdminById = async (req, res) => {
    // get token from body
    const { token } = req.body;

    // check if token role is admin
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin')
            return res.status(400).json({ mssg: 'Invalid token Please provide a token with admin role' });
    } catch (err) {
        return res.status(400).json({
            mssg: 'Invalid token'
        })
    }

    // get admin id from body
    const { id } = req.body;

    // check if id is the same in token
    if (decoded.id !== id)
        return res.status(400).json({ mssg: 'The token id is not the same as the admin id' });

    // check if admin exist
    let admin;
    try {
        admin = await db.query('SELECT * FROM admins WHERE admin_id = $1', [id]);
    } catch (err) {
        return res.status(400).json({ mssg: 'Admin not found' });
    }

    // get data from body
    const { name, email, password } = req.body;

    const query = 'UPDATE admins SET ';

    // check if name is provided
    if (name)
        query += `admin_name = '${name}', `;
    // check if email is provided
    if (email)
        query += `admin_email = '${email}', `;
    // check if password is provided
    if (password)
        query += `admin_password = '${password}', `;

    // remove last comma
    query = query.slice(0, -2);

    // add where clause
    query += ` WHERE admin_id = ${id}`;

    // update admin
    admin = await db.query(query);

    // create new token
    const newToken = jwt.sign({
        id: admin.rows[0].admin_id,
        username: admin.rows[0].admin_name,
        email: admin.rows[0].admin_email,
        role: 'admin'},
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // return new token
    return res.status(200).json({ token });

    return res.status(200).json({
        mssg: 'Admin updated',
        admin: admin.rows[0]
    });
};

exports.updateSchoolStateById = async (req, res) => {
    const { token, school_id, state } = req.body;

    // if token not provided
    if (!token)
        return res.status(400).json({ mssg: 'Token not provided' });

    // if school_id not provided
    if (!school_id)
        return res.status(400).json({ mssg: 'School id not provided' });

    // if state not provided
    if (!state)
        return res.status(400).json({ mssg: 'State not provided' });

    // if state is not a boolean
    if (typeof state !== 'boolean')
        return res.status(400).json({ mssg: 'State must be a boolean with value true or false' });

    // if state is not true or false
    if (state !== true && state !== false)
        return res.status(400).json({ mssg: 'State must be a boolean with value true or false' });

    // check token role
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin')
            return res.status(400).json({ mssg: 'Invalid token Please provide a token with admin role' });
    } catch (err) {
        return res.status(400).json({
            mssg: 'Invalid token'
        });
    }

    // check if school exist
    let school;
    try {
        school = await db.query('SELECT * FROM schools WHERE school_id = $1', [school_id]);
    } catch (err) {
        return res.status(400).json({ mssg: 'School not found' });
    }

    // chenge state of school
    try {
        await db.query('UPDATE schools SET state = $1 WHERE school_id = $1', [state, school_id]);
    } catch (err) {
        return res.status(400).json({
            mssg: err.message
        });
    }
}
