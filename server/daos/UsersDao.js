var db = require('../../db/db.js');
var dbUtil = require('../utils/DbUtil.js');

module.exports = {
    getAllUsers: function(response) {
        var query =
            "SELECT T1.* " +        //what is T1?
            "FROM users AS T1 " +
            "ORDER BY T1.userId DESC;";

        db.query(query, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    getUserById: function(userId, response) {
        var query =
            "SELECT T1.* " +
            "FROM users AS T1 " +
            "WHERE T1.userId = ?;";

        db.query(query, userId, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    getUserByName: function(name, response) {
            var query =
                "SELECT T1.* " +
                "FROM users AS T1 " +
                "WHERE T1.name = ?;";

            db.query(query, name, function (err, result) {
                    dbUtil.handleQueryResult(err, result, response);
            });
    },

    getUserByHouseId: function(req, res, next) {
        var query =
            "SELECT T1.* " +
            "FROM users AS T1 " +
            "WHERE T1.houseId = ?;";

        db.query(query, houseId, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    }
};