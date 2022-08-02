const { Client } = require('pg');
require('dotenv').config();


const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:oussama@localhost:5432/team_8',
    ssl: process.env.DATABASE_URL ? true : false
});


client.connect();

client.query(`SELECT * FROM schools`, (err, result) => {
    if (!err) {
        console.log('Success !');
    }
    else {
        console.log(err);
    }
})

module.exports = client;
