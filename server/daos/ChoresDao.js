var db = require('../../db/db.js');
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

    getChoreById: function(choreId, response) {
        var query =
            "SELECT T1.* " +
                "FROM chores AS T1 " +
                "WHERE T1.choreId = ?;";

        db.query(query, choreId, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
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

    getCompletedChoresByHouseId: function(houseId, response) {
        var query =
            "SELECT T1.*" +
            "FROM chores AS T1 " +
            "WHERE T1.houseId = ? " +
            "AND T1.completed = TRUE " +
            "ORDER BY T1.dueDate DESC;";

        db.query(query, houseId, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    getUncompletedChoresByHouseId: function(houseId, response) {
        var query =
            "SELECT T1.*" +
            "FROM chores AS T1 " +
            "WHERE T1.houseId = ? " +
            "AND T1.completed = FALSE " +
            "ORDER BY T1.dueDate DESC;";

        db.query(query, houseId, function (err, result) {
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
        console.log(query);

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
                "WHERE T1.choreId = ?;";

        db.query(query, chore.choreId, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    }
};