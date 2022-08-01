const express = require('express');
const StudentsController = require('../controllers/students');

// create router
const router = express.Router();

router.get('/', StudentsController.getAllStudents);
router.get('/:id', StudentsController.getStudentById);
router.get('/:email', StudentsController.getStudentByEmail);
router.get('/:email/:password', StudentsController.checkPassword);
router.post('/', StudentsController.addStudent);
router.patch('/:id', StudentsController.updateStudent);
router.delete('/:id', StudentsController.deleteStudentById);
router.delete('/:email', StudentsController.deleteStudentByEmail);

// export router
module.exports = router;
