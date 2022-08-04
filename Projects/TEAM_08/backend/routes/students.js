const express = require('express');
const StudentsController = require('../controllers/students');

// create router
const router = express.Router();

// Students routes
router.get('/', StudentsController.getAllStudents);
router.get('/:id', StudentsController.getStudentById);
router.patch('/:id', StudentsController.updateStudent);
router.delete('/', StudentsController.deleteStudent); 

// export router
module.exports = router;
