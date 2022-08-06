const db = require('../modules/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


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

// update school by id
exports.updateSchoolById = async (req, res) => {
   // get token from body
   const { token } = req.body;

   // if token is not provided
   if (!token)
      return res.status(400).json({ mssg: 'Please provide a token with role school or admin' });

   // get role from token
   let decodedToken;
   try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
   } catch (err) {
      return res.status(401).json({
         error: 'Invalid token'
      });
   }

   // if user is not a school or admin
   if (decodedToken.role !== 'school' && decodedToken.role !== 'admin')
      return res.status(400).json({ mssg: 'Please provide a token with role school or admin' });

   try {
      // get school id from body
      const { id } = req.body;

      // if school id is not provided
      if (!id)
         return res.status(400).json({ mssg: 'Please provide a school id'});

      // check if school id is the same in the token if token with role school
      if (decodedToken.role === 'school' && decodedToken.id !== id)
         return res.status(400).json({ mssg: 'You are not allowed to update this school'});

      // check if school exists
      try {
         await db.query(`SELECT school_id FROM schools WHERE school_id = ${id}`);
      } catch (err) {
         return res.status(400).json({
            mssg: 'School not found'
         });
      }

      // update school
      const query = `UPDATE schools SET `;

      // get school data from body
      const { open_at, close_at, paid, school_facebook, school_url, school_desc, school_teachers_number, school_phone } = req.body;
      const { school_admin_name, school_admin_password, school_admin_email, school_avatar_url, school_name } = req.body;
      const { school_wilaya_id } = req.body;

      // if open_at is provided
      if (open_at)
         query += `open_at = '${open_at}', `;
      // if close_at is provided
      if (close_at)
         query += `close_at = '${close_at}', `;
      // if paid is provided
      if (paid)
         query += `paid = '${paid}', `;
      // if school_facebook is provided
      if (school_facebook)
         query += `school_facebook = '${school_facebook}', `;
      // if school_url is provided
      if (school_url)
         query += `school_url = '${school_url}', `;
      // if school_desc is provided
      if (school_desc)
         query += `school_desc = '${school_desc}', `;
      // if school_teachers_number is provided
      if (school_teachers_number)
         query += `school_teachers_number = '${school_teachers_number}', `;
      // if school_phone is provided
      if (school_phone)
         query += `school_phone = '${school_phone}', `;
      // if school_admin_name is provided
      if (school_admin_name)
         query += `school_admin_name = '${school_admin_name}', `;
      // if school_admin_password is provided
      if (school_admin_password)
         query += `school_admin_password = '${school_admin_password}', `;
      // if school_admin_email is provided
      if (school_admin_email)
         query += `school_admin_email = '${school_admin_email}', `;
      // if school_avatar_url is provided
      if (school_avatar_url)
         query += `school_avatar_url = '${school_avatar_url}', `;
      // if school_name is provided
      if (school_name)
         query += `school_name = '${school_name}', `;
      // if school_wilaya_id is provided
      if (school_wilaya_id)
         query += `school_wilaya_id = '${school_wilaya_id}', `;

      // remove last comma
      query = query.slice(0, -2);

      // add where clause
      query += ` WHERE school_id = ${id}`;

      // get all students in the school
      const students = await db.query('SELECT * FROM students WHERE student_school_id = $1', [id]);

      // update school
      try {
         const schoolRow = await db.query(query);
         // make token
         const token = jwt.sign({
            id: schoolRow.rows[0].school_id,
            name: schoolRow.rows[0].school_name,
            avatar_url: schoolRow.rows[0].school_avatar_url,
            teachers_nember: schoolRow.rows[0].school_teachers_number,
            phone: schoolRow.rows[0].school_phone,
            desc: schoolRow.rows[0].school_desc,
            facebook: schoolRow.rows[0].school_facebook,
            url: schoolRow.rows[0].school_url,
            open_at: schoolRow.rows[0].open_at,
            close_at: schoolRow.rows[0].close_at,
            paid: schoolRow.rows[0].school_paid === 'true' ? true : false,
            location: await require('./wilaya').getWilayaById(school_wilaya_id),
            students_number: students.rows.length,
            rate: await require('./rate').getRate(id),
            comments: await require('./comments').getComments(id),
            admin: {
                  name: schoolRow.rows[0].school_admin_name,
                  email: schoolRow.rows[0].school_admin_email,
            },
            role: 'school' },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
         );

         // return token
         return res.status(200).json({
            token
         });
      } catch (err) {
         return res.status(500).json({
            mssg: 'Error updating school'
         });
      }

   } catch (err) {
      return res.status(500).json({
         error: err.message
      });
   }
};

// Get schools by user query
exports.getSchoolsByQuery = async (req, res) => {
   return res.status(200).json({ mssg: 'getSchoolsByQuery' });
};
