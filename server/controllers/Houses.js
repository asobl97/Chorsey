var housesDao = require('../daos/HousesDao.js');
var util = require('../utils/util.js');

module.exports = {
    getHouses: function(req, res, next) {
        housesDao.getAllHouses(function(response) {
            var responseObj = {};
            responseObj.result = response;

            res.send(responseObj);
        });
    },

    getHouseById: function(req, res, next) {
        housesDao.getHouseById(req.params.houseId, function(response) {
            if (house == null) {
                res.status(204).send("Found no house with ID: " + req.params.houseId);
                return;
            }

            var responseObj = {};
            responseObj.result = response;

            res.send(responseObj);
        });
    },

    createHouse: function(req, res, next) {
        var house = {};
        house.name = req.body.name;
        house.userCount = 0;

        housesDao.insertHouse(house, function(response) {
            if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                res.sendStatus(500);
            } else {
                var responseObj = {};
                responseObj.result = house;

                res.send(responseObj);
            }
        });
    },

    updateHouse: function(req, res, next) {
        housesDao.getHouseById(req.params.houseId, function(house) {
            if (house == null) {
                res.status(204).send("Found no house with ID: " + req.params.houseId);
                return;
            }

            house.houseId = req.params.houseId;
            house.name = req.body.name;

            housesDao.updateHouse(house, function(response) {
                if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                    res.sendStatus(500);
                } else {
                    var responseObj = {};
                    responseObj.result = house;

                    res.send(responseObj);
                }
            });
        });
    },

    deleteHouse: function(req, res, next) {
        housesDao.getHouseById(req.params.houseId, function(house) {
            if (house == null) {
                throw new Error("Found no house with ID: " + req.params.houseId)
            }

            housesDao.deleteHouse(house, function(response) {
                if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        });
    }
};