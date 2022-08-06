const db = require('../modules/db');

// get rate from db and calculate average rate
exports.getRate = async (id) => {
    const rateList = await db.query('SELECT rate FROM rating_comments WHERE school_id = $1', [id]);

    if (rateList.rows.length === 0)
        return 0;

    let sum = 0;
    for (let i = 0; i < rateList.rows.length; i++)
        sum += rateList.rows[i].rate;

    return sum / rateList.rows.length;
}
