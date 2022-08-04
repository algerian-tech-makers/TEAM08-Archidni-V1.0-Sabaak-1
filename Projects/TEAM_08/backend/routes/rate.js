const express = require('express');
const RateController = require('../controllers/rate');

// Setup routing
const router = express.Router();

router.get('/:school_id', RateController.listRates);
router.post('/', RateController.addRate);

module.exports = router;