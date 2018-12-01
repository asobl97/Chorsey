var db = require('./db.js');

var CHORES_DB_SCHEMA = require('./schema/ChoresDbSchema');
var HOUSES_DB_SCHEMA = require('./schema/HousesDbSchema');
var USERS_DB_SCHEMA = require('./schema/UsersDbSchema');

module.exports = {
    updateSchema: function () {
        db.query(CHORES_DB_SCHEMA, function (err, result) {
            if (err) throw err;
            console.log("Updated table: chores");
        });

        db.query(HOUSES_DB_SCHEMA, function (err, result) {
            if (err) throw err;
            console.log("Updated table: houses");
        });

        db.query(USERS_DB_SCHEMA, function (err, result) {
            if (err) throw err;
            console.log("Updated table: users");
        });
    }
};