const express = require('express');

// create router
const router = express.Router();

// add api routes
router.post('/login', require('../controllers/login').login);
router.post('/signup', require('../controllers/signup').signup );
// router.delete('/delete', require('../controllers/delete').delete);
router.post('/decode-token', require('../controllers/decode-token').decodeToken);


// export router
module.exports = router;    
