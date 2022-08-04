const express = require('express');

// create router
const router = express.Router();

// add api routes
router.get('/students', require('../controllers/students').getAllStudents);
router.get('/students/:id', require('../controllers/students').getStudentById);
router.get('/schools', require('../controllers/schools').getAllSchools);
router.get('/schools/:id', require('../controllers/schools').getSchoolById);
router.get('/schools/query', require('../controllers/schools').getSchoolsByQuery);

// export router
module.exports = router;
