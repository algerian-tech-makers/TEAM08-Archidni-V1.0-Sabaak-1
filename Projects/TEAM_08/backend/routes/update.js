const express = require('express');

// create router
const router = express.Router();

// create api routes
router.post('/students', require('../controllers/students').updateStudentById);
router.post('/schools', require('../controllers/schools').updateSchoolById);

// export router
module.exports = router;
