const express = require('express');


// create app
const app = express();


// add middleware express.json()
app.use(express.json());


// add middleware to parse request body
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});


// api middleware
app.use('/api/learners', require('./routes/learner'));


// set port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
