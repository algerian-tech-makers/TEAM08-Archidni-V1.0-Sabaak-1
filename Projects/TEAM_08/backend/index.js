const express = require('express');


// create app
const app = express();


// set port
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
