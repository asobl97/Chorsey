var db = require('../../db/db.js');
var dbUtil = require('../utils/DbUtil.js');

module.exports = {
    getAllHouses: function(response) {
        var query =
            "SELECT T1.* " +        //what is T1?
            "FROM houses AS T1 " +
            "ORDER BY T1.houseId DESC;";

        db.query(query, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    getHouseById: function(houseId, response) {
        var query =
            "SELECT T1.* " +
            "FROM houses AS T1 " +
            "WHERE T1.houseId = ?;";

        db.query(query, houseId, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    getHouseByName: function(name, response) {
        var query =
            "SELECT T1.* " +
            "FROM houses AS T1 " +
            "WHERE T1.name = ?;";

        db.query(query, name, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    getHouseByUserCount: function(userCount, response) {
        var query =
            "SELECT T1.* " +
            "FROM houses AS T1 " +
            "WHERE T1.userCount = ?;";

        db.query(query, userCount, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    }
};