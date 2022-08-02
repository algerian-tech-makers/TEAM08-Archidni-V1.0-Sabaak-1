const express = require('express');
const StudentsController = require('../controllers/students');

// create router
const router = express.Router();

router.get('/', StudentsController.getAllStudents);
router.get('/:id', StudentsController.getStudentById);
router.post('/check', StudentsController.checkPassword);
router.post('/', StudentsController.addStudent);
router.patch('/:id', StudentsController.updateStudent);
router.delete('/', StudentsController.deleteStudent);       // delete with body { "id": x Or "student_email": "xx@xxx.xx"}

// export router
module.exports = router;
