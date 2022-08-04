const express = require('express');

// create router
const router = express.Router();

// add api routes
router.post('/login', require('../controllers/login').login);
router.post('/signup', require('../controllers/signup').signup );
router.get('/logout', (req, res) => { res.status(200).json({ message: 'logout' }); });
router.post('/refresh', (req, res) => { res.status(200).json({ message: 'refresh' }); });

// export router
module.exports = router;    
