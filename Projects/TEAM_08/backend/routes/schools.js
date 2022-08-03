const express = require('express');
const SchoolsController = require('../controllers/schools');

// create router
const router = express.Router();

// School routes
router.get('/', SchoolsController.getAllSchools);
router.post('/', SchoolsController.addSchool);
router.get('/:id', SchoolsController.getSchoolById);
router.put('/:id', SchoolsController.updateSchool);
router.delete('/:id', SchoolsController.deleteSchool);

// School Admin routes
router.put('/admin/:id', SchoolsController.updateSchoolAdmin);

// export router
module.exports = router;
