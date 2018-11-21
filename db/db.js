var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "chorsey", //replace with the MySQL user on your machine
    password: "choresRfun", //replace with the MySQL password on your machine
    database: "chorsey"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = db;