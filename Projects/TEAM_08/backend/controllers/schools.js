const db = require('../modules/db');

// to encrypt passwords
const bcrypt = require('bcrypt');


// API - Fetch all schools
exports.getAllSchools = async (req, res) => {
   try {
      const query = `
         SELECT school_id, open_at, close_at, paid, school_facebook, school_url, school_desc, 
         school_teachers_number, school_phone school_admin_name, school_admin_email, 
         school_avatar_url, school_name, school_location_lat, school_location_long FROM schools`;
      const schoolRows = await db.query(query);
      res.status(200).json(schoolRows.rows);
   } catch (err) {
      res.status(500).json({
         error: err.message
      });
   }
};

// Get school by id
exports.getSchoolById = async (req, res) => {
      try {
         const query = `
         SELECT school_id, open_at, close_at, paid, school_facebook, school_url, school_desc, 
         school_teachers_number, school_phone school_admin_name, school_admin_email, 
         school_avatar_url, school_name, school_location_lat, school_location_long FROM schools
         WHERE school_id = ${req.params.id}`;
         const result = await db.query(query);
         res.status(200).json(result.rows[0]);
      } catch (err) {
         res.status(500).json({
            error: err.message
         });
      }
}


// Get schools by user query
exports.getSchoolsByQuery = async (req, res) => {
   return res.status(200).json({ mssg: 'getSchoolsByQuery' });
};