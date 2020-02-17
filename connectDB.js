const mysql = require('mysql');
const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123qweXX!!@@',
    database:'produtos'
});

module.exports = con;