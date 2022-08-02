const db = require('../modules/db');

// to encrypt passwords
const bcrypt = require('bcrypt');
const saltRounds = 10;


// API - Fetch all schools
const getAllSchools = (req, res) => {
   db.query(`SELECT * FROM schools`)
      .then( result => {
         return res.status(200).json(result.rows);
      })
      .catch( err => {
         res.status(500).json({
            error: err.message
         });
      })
};

// Get school by id
const getSchoolById = (req, res) => {
   
      db.query(`SELECT * FROM schools WHERE school_id=${req.params.id}`)
      .then( result => {
         return res.status(200).json(result.rows[0]);
      })   
      .catch( err => {
         res.status(500).json({
            error: `School with id ${req.params.id} not found !`
         });
      });
}

// add new school 
const addSchool = (req ,res) => {
   const {
      school_name,school_desc,school_location,school_phone,school_avatar,school_facebook,teacher_num,admin_name,admin_email,admin_password,paid,open_at,close_at
   } = req.body
   
   db.query(`INSERT INTO schools(school_name, school_desc, school_location, school_phone, school_avatar, school_facebook, teacher_num, admin_name, admin_email, admin_password, paid, open_at, close_at) VALUES('${school_name}','${school_desc}','${school_location}','${school_phone}', '${school_avatar}','${school_facebook}','${teacher_num}','${admin_name}','${admin_email}','${admin_password}',${paid},'${open_at}', '${close_at}');`)
      .then( result => {
         res.status(200).json({
            result: true
         })
      })
      .catch( err => {
         error: 'Error occured ' + err.message;
      })
}

// Update school info by givven id
const updateSchool = (req, res) => {
   const {
      school_name,school_desc,school_location,school_phone,school_avatar,school_facebook,teacher_num,paid,open_at,close_at
   } = req.body
   
   db.query(`UPDATE schools SET 
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
         `)
      .then( result => {
         res.status(200).json({result: true})
      })
      .catch( err => {
         res.status(500).json({result: err.message})
      })
}

// Delete school by id
const deleteSchool = (req, res) => {
   db.query(`DELETE FROM schools WHERE school_id = ${req.params.id}`)
      .then( result => {
         res.status(200).json({result : true})
      })
      .catch( err => {
         res.status(500).json({result : false})
      })
}

// Update admin info
const updateSchoolAdmin = (req, res) => {
   const {
      admin_name,
      admin_email,
      admin_password
   } = req.body

   bcrypt.hash(admin_password, 10)
      .then(result => {
         db.query(`UPDATE schools SET 
               admin_name = '${admin_name}',
               admin_email = '${admin_email}',
               admin_password = '${result}'
            WHERE school_id = '${req.params.id}'`);
            res.status(200).json({result : true});
         }).then( result => {
            res.status(200).json({result : true});
         })
         .catch( err => {
            res.status(500).json({result : false});
         })


   // db.query(`UPDATE schools SET 
   //             admin_name = ,
   //             admin_email = ,
   //             admin_password = 
   //          WHERE school_id = '${req.params.id}'`);
}

module.exports = {
   getAllSchools,
   getSchoolById,
   addSchool,
   updateSchool,
   deleteSchool,
   updateSchoolAdmin
}