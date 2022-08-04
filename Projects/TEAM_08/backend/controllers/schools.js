const db = require('../modules/db');

// to encrypt passwords
const bcrypt = require('bcrypt');


// API - Fetch all schools
const getAllSchools = async (req, res) => {
   try {
      const result = await db.query(`SELECT * FROM schools`);
      res.status(200).json(result.rows);
   } catch (error) {
      res.status(500).json({result: false});
   }
      
};

// Get school by id
const getSchoolById = async (req, res) => {
      try {
         const result = await db.query(`SELECT * FROM schools WHERE school_id=${req.params.id}`);
         res.status(200).json(result.rows[0]);
      } catch (error) {
         res.status(500).json({result: false});
      }
}

// Update school info by givven id
const updateSchool = async (req, res) => {
   const {
      school_name,school_desc,school_location,school_phone,school_avatar,school_facebook,teacher_num,paid,open_at,close_at
   } = req.body
   
   try {
      await db.query(`UPDATE schools SET 
               school_name = '${school_name}', 
               school_desc = '${school_desc}', 
               school_location = '${school_location}', 
               school_phone = '${school_phone}', 
               school_avatar = '${school_avatar}', 
               school_facebook = '${school_facebook}', 
               teacher_num = '${teacher_num}', 
               paid = ${paid}, 
               open_at = '${open_at}', 
               close_at = '${close_at}'
            WHERE school_id = '${req.params.id}';
         `);
      res.status(200).json({result: true})
   } catch (error) {
      res.status(500).json({result: false})
   }
}

// Delete school by id
const deleteSchool = async (req, res) => {
   try {
      await db.query(`DELETE FROM schools WHERE school_id = ${req.params.id}`)
      res.status(200).json({result: true})
   } catch (error) {
      res.status(500).json({result: false})
   }
      
}

// Update admin info
const updateSchoolAdmin = async (req, res) => {
   const {
      admin_name,
      admin_email,
      admin_password
   } = req.body

   const secure_password = await bcrypt.hash(admin_password, 10)
   try {
      await db.query(`UPDATE schools SET 
               school_admin_name = '${admin_name}',
               school_admin_email = '${admin_email}',
               school_admin_password = '${secure_password}'
            WHERE school_id = '${req.params.id}';`);
      res.status(200).json({result: true})
   } catch (error) {
      res.status(500).json({result: false})
   }
}

module.exports = {
   getAllSchools,
   getSchoolById,
   updateSchool,
   deleteSchool,
   updateSchoolAdmin
}