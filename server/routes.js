const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();

async function explore(req, res) {
    // a GET request to /explore?title=search

    const input = req.query.title
    
    var q = `SELECT DISTINCT title, authors, average_rating as rating, right(publication_date, 4) as year FROM Books
    WHERE title LIKE '%${input}%' OR authors LIKE '%${input}%'`
    connection.query(q,
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                
                res.json({ results: results })
                console.log(results)
            }
        });
    
}

module.exports = {
    explore,
}