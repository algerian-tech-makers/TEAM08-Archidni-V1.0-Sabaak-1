const db = require('../modules/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// get all comments from db
exports.getComments = async (id) => {
    const comments = await db.query('SELECT comment FROM rating_comments WHERE school_id = $1', [id]);
    return comments.rows;
}


// add comment and rate to db
exports.addCommentAndRate = async (req, res) => {
    const { token, id, comment, rate, school_id } = req.body;

    // if id is not provided
    if (!id) 
        return res.status(400).json({ mssg: 'id is required' });

    // virify the token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'student')
            return res.status(401).json({ mssg: 'You are not authorized to add comment and rate, only student can!' });

        if (decoded.id !== id)
            return res.status(400).json({ mssg: 'Invalid token id not match the token id' });
    } catch (err) {
        return res.status(401).json({ mssg: 'Invalid token' });
    }

    // check if comment provided
    if (!comment)
        return res.status(400).json({ mssg: 'Comment is required' });

    // check if the comment is empty
    if (comment === '')
        return res.status(400).json({ mssg: 'Comment is empty' });

    // check if the rate is provided
    if (!rate)
        return res.status(400).json({ mssg: 'Rate is required' });

    // check if rate is between 1 and 5
    if (rate < 1 || rate > 5)
        return res.status(400).json({ mssg: 'Rate must be between 1 and 5' });

    // check if school_id is provided
    if (!school_id)
        return res.status(400).json({ mssg: 'School id is required' });

    // check if school_id is exist in db
    try {
        await db.query('SELECT * FROM schools WHERE school_id = $1', [school_id]);
    } catch (err) {
        return res.status(400).json({ mssg: 'School id not exist' });
    }

    // check if they are a comment and rate for the same school and the same student
    const check = await db.query('SELECT * FROM rating_comments WHERE school_id = $1 AND student_id = $2', [school_id, id]);
    if (check.rows.length > 0) {
        // update the comment and rate
        await db.query('UPDATE rating_comments SET comment = $1, rate = $2 WHERE school_id = $3 AND student_id = $4', [comment, rate, school_id, id]);
        return res.status(200).json({ mssg: 'Comment and rate updated' });
    }

    // add comment and rate to db
    const query = 'INSERT INTO rating_comments (student_id, school_id, comment, rate) VALUES ($1, $2, $3, $4)';
    try {
        await db.query(query, [id, school_id, comment, rate]);
    } catch (err) {
        return res.status(400).json({
            mssg: 'Comment and rate not added',
            err: err.message
        });
    }
    return res.status(200).json({ mssg: 'Comment and rate added successfully' });
}
