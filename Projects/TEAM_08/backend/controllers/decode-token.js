const db = require('../modules/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.decodeToken = async (req, res) => {
    const { token } = req.body;

    // check if token is valid
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ decoded });
    } catch (err) {
        return res.status(400).json({ mssg: 'Token is invalid' });
    }
};
