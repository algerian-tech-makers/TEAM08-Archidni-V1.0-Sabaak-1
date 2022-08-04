const db = require('../modules/db');

// to encrypt passwords
const bcrypt = require('bcrypt');

// Get all admins from db
const getAllAdmins = (req, res) => {
    db.query(`SELECT * FROM admins`)
       .then( result => {
          return res.status(200).json(result.rows);
       })
       .catch( err => {
          res.status(500).json({
             error: err.message
          });
       })
 };

const getAdminById = (req, res) => {
    db.query(`SELECT * FROM admins WHERE admin_id=${req.params.id}`)
      .then( result => {
        if(result.rows[0]) {
            return res.status(200).json(result.rows[0]);
        }
        else {
            res.status(500).json({
                error: `Admin with id ${req.params.id} not found !`
             });
        }
      })   
      .catch( err => {
         res.status(500).json({
            error: `Admin with id ${req.params.id} not found !`
         });
      });
}

// update student in database
const updateAdmin = async (req, res) => {
    try {
        const {
            admin_name,
            admin_email,
            admin_password
        } = req.body      

        const hashedPassword = await bcrypt.hash(admin_password, 10);
        await db.query(`
        UPDATE admins SET 
            admin_name = '${admin_name}',
            admin_email = '${admin_email}',
            admin_password = '${hashedPassword}'
         WHERE admin_id = '${req.params.id}'
         `);
        // return response
        return res.status(200).json({result: true});
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
    }
};

 // Delete admin by id
const deleteAdmin = (req, res) => {
    db.query(`DELETE FROM admins WHERE admin_id = ${req.params.id}`)
       .then( result => {
          res.status(200).json({result : true})
       })
       .catch( err => {
          res.status(500).json({result : false})
       })
 }

 module.exports = {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin
 }