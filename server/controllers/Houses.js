var housesDao = require('../daos/HousesDao.js');

module.exports = {
    getAllHouses: function(req, res, next) {
        housesDao.getAllHouses(function(response) {
            res.send(response);
        });
    },

    getHouseById: function(req, res, next) {
        housesDao.getHouseById(req.params.houseId, function(response) {
            res.send(response);
        });
    },

    createHouse: function(req, res, next) {
        var house = {};
        house.houseId = req.body.houseId;
        house.name = req.body.name;
        house.userCount = req.body.userCount;

        housesDao.insertHouse(house, function(response) {
            if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    },

    updateHouse: function(req, res, next) {
        housesDao.gethouseById(req.params.houseId, function(house) {
            if (house == null) {
                res.status(204).send("Found no house with ID: " + req.params.houseId);
                return;
            }

            house.houseId = req.body.houseId;
            house.name = req.body.name;
            house.userCount = req.body.userCOunt;

            housesDao.updateHouse(house, function(response) {
                if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        });
    },

    deleteHouse: function(req, res, next) {
        usersDao.deleteHouse(req.params.houseId, function(house) {
            if (house == null) {
                throw new Error("Found no house with ID: " + req.params.houseId)
            }

            housesDao.deleteHouse(house, function(response) {
                res.send(response);
            });
        });
    }
};