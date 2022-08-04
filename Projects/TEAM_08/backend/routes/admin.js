const express = require('express');
const AdminController = require('../controllers/admin');

// create router
const router = express.Router();

// Admin routes
router.get('/', AdminController.getAllAdmins);
router.get('/:id', AdminController.getAdminById);
router.put('/:id', AdminController.updateAdmin);
router.delete('/:id', AdminController.deleteAdmin);

// export router
module.exports = router;