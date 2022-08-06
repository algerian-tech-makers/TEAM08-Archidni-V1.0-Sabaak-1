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


// Access-Control-Allow-Origin
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// not verify may get an issue
// app.use('/api/rate', require('./routes/rate'));

// verify api work with no issue
app.use('/api/add', (require('./routes/addCR')));
app.use('/api/update', require('./routes/update'));
app.use('/api/fetch', require('./routes/fetch'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/*', (req, res) => { res.status(404).json({ mssg: 'API Not found' }); });


// set port
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
