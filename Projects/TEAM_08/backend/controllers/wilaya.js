const db = require('../modules/db');


// API - Fetch all schools
exports.getAllWilaya = async (req, res) => {
    try {
        const wilayas = await db.query(`SELECT * FROM wilaya`);
        res.status(200).json(wilayas.rows);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};


// Get wilaya name by id
exports.getWilayaById = async (id) => {
    try {
        const name = await db.query(`SELECT name FROM wilaya WHERE id = ${id}`);
        return name.rows[0].name;
    } catch (err) {
        return err.message;
    }
}
