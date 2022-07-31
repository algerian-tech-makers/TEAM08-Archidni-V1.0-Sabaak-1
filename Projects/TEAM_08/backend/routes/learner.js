const express = require('express');

// create router
const router = express.Router();

// create api middleware
router.get('/', (req, res) => {
    res.json({mssg: 'GET all learners'});
});

router.get('/:id', (req, res) => {
    res.json({mssg: 'GET learner by id'});
});

router.post('/', (req, res) => {
    res.json({mssg: 'POST new learner'});
})

router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE learner by id'});
});

router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE learner by id'});
});


// export router
module.exports = router;
