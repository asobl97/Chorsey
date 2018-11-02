var db = require('../../db/db.js');

var util = require('../utils/util.js');
var dbUtil = require('../utils/DbUtil.js');

module.exports = {
    getAllChores: function(response) {
        var query =
            "SELECT T1.* " +
            "FROM chores AS T1 " +
            "ORDER BY T1.dueDate DESC;";

        db.query(query, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    getChoresByFilter: function(queries, response) {
        var params = [];
        var query =
            "SELECT T1.* " +
                "FROM chores AS T1 " +
                "WHERE T1.choreId IS NOT NULL ";

        if (util.isNotEmpty(queries.userId)) {
            query += "AND T1.userId = ? ";
            params.push(queries.userId);
        }
        if (util.isNotEmpty(queries.houseId)) {
            query += "AND T1.houseId = ? ";
            params.push(queries.houseId);
        }
        if (util.isNotEmpty(queries.completed)) {
            query += "AND T1.completed = ? ";
            params.push(queries.completed);
        }

        query += "ORDER BY T1.dueDate DESC;";

        db.query(query, params, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    getChoreById: function(choreId, response) {
        var query =
            "SELECT T1.* " +
                "FROM chores AS T1 " +
                "WHERE T1.choreId = ?;";

        db.query(query, choreId, function (err, result) {
            dbUtil.handleQueryResult(err, result[0], response);
        });
    },

    getChoresByUserId: function(userId, response) {
        var query =
            "SELECT T1.* " +
                "FROM chores AS T1 " +
                "WHERE T1.userId = ? " +
                "ORDER BY T1.dueDate DESC;";

        db.query(query, userId, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    getChoresByHouseId: function(houseId, response) {
        var query =
            "SELECT T1.*" +
                "FROM chores AS T1 " +
                "WHERE T1.houseId = ? " +
                "ORDER BY T1.dueDate DESC;";

        db.query(query, houseId, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    getChoresByCompleted: function(completed, response) {
        var query =
            "SELECT T1.*" +
            "FROM chores AS T1 " +
            "AND T1.completed = ? " +
            "ORDER BY T1.dueDate DESC;";

        db.query(query, completed, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    insertChore: function(chore, response) {
        var query =
            "INSERT INTO chores (choreId, name, description, dueDate, userId, houseId, completed) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?);";

        var params = [
            chore.choreId,
            chore.name,
            chore.description,
            chore.dueDate,
            chore.userId,
            chore.houseId,
            chore.completed
        ];

        db.query(query, params, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    updateChore: function(chore, response) {
        var query =
            "UPDATE chores " +
                "SET choreId = ?, name = ?, description = ?, dueDate = ?, userId = ?, houseId = ?, completed = ? " +
                "WHERE choreId = ?;";

        var params = [
            chore.choreId,
            chore.name,
            chore.description,
            chore.dueDate,
            chore.userId,
            chore.houseId,
            chore.completed,
            chore.choreId
        ];

        db.query(query, params, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    deleteChore: function(chore, response) {
        var query =
            "DELETE FROM chores " +
                "WHERE choreId = ?;";

        db.query(query, chore.choreId, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    }
};