const db = require('../modules/db');

const listRates = async (req, res) => {

    try {
        const comments = await db.query(`SELECT * FROM rating_comments WHERE school_id = ${req.params.school_id};`);
        
        res.status(200).json({
            result: comments.rows
        });
    } catch (error) {
        res.status(500).json({result : false});
    }

}

const addRate = async (req, res) => {
    const {student_id,school_id,comment,rate} = req.body;
    
    try {
        await db.query(`INSERT INTO rating_comments(
            student_id, school_id, rate, comment
        ) VALUES(
            ${student_id}, ${school_id}, ${rate}, '${comment}'
        );`);
        
        res.status(200).json({result: true})
    } catch (error) {
        res.status(500).json({result: error.message})
    }
}

module.exports = {
    listRates,
    addRate
}