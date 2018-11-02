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

    insertHouse: function(house, response) {
        var query =
            "INSERT INTO houses (houseId, name, userCount) " +
            "VALUES (?, ?, ?);";

        var params = [
            house.houseId,
            house.name,
            house.userCount
        ];

        db.query(query, params, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    updateHouse: function(house, response) {
        var query =
            "UPDATE houses " +
            "SET houseId = ?, name = ?, userCount = ? " +
            "WHERE houseId = ?;";

        var params = [
            house.houseId,
            house.name,
            house.userCount
        ];

        db.query(query, params, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    },

    deleteHouse: function(house, response) {
        var query =
            "DELETE FROM houses " +
            "WHERE T1.houseID = ?;";

        db.query(query, house.houseId, function (err, result) {
            dbUtil.handleQueryResult(err, result, response);
        });
    }
};