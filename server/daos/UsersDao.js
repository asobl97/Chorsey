var db = require('../db/db.js');
var dbUtil = require('../utils/DbUtil.js');

module.exports = {
    getAllUsers: function(response) {
        var query =
            "SELECT T1.* " +
                "FROM users AS T1;";

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
            dbUtil.handleQueryResult(err, result[0], response);
        });
    },

    getUsersByIds: function(userIds, response) {
        var query =
            "SELECT T1.* " +
                "FROM users AS T1 " +
                "WHERE T1.userId IN (";

        for (var i=0;i<userIds.length;i++) {
            query += "?";
            if (i<userIds.length-1) {
                query += ", ";
            }
        }
        query += ");";

        db.query(query, userIds, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    getUsersByHouseId: function(houseId, response) {

        var query =
            "SELECT T1.* " +
                "FROM users AS T1 " +
                "WHERE T1.houseId = ?;";

        db.query(query, houseId, function (err, result) {

            dbUtil.handleQueryResult(err, result, response);
        });
    },

    insertUser: function(user, response) {
        var query =
            "INSERT INTO users (userId, name, houseId) " +
                "VALUES (?, ?, ?);";

        var params = [
            user.userId,
            user.name,
            user.houseId
        ];

        db.query(query, params, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    updateUser: function(user, response) {
        var query =
            "UPDATE users " +
                "SET userId = ?, name = ?, houseId = ? " +
                "WHERE userId = ?;";

        var params = [
            user.userId,
            user.name,
            user.houseId,
            user.userId
        ];

        db.query(query, params, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    deleteUser: function(user, response) {
        var query =
            "DELETE FROM users " +
                "WHERE userId = ?;";

        db.query(query, user.userId, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    }
};