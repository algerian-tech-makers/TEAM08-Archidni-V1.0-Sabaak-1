const db = require('../modules/db');


// get all comments from db
exports.getComments = async (id) => {
    const comments = await db.query('SELECT comment FROM rating_comments WHERE school_id = $1', [id]);
    return comments.rows;
}
