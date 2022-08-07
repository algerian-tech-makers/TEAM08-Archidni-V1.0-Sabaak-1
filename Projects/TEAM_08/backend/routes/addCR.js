const express = require('express');

// create router
const router = express.Router();

// create api routes
router.post('/comment-rate', require('../controllers/comments').addCommentAndRate);

// export router
module.exports = router;
