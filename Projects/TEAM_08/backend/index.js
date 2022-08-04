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


// APIs
app.use('/api/students', require('./routes/students'));
app.use('/api/schools', require('./routes/schools'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/rate', require('./routes/rate'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/*', (req, res) => { res.status(404).json({ mssg: 'API Not found' }); });


// set port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
