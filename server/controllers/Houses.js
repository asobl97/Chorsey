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

    getHouseByName: function(req, res, next) {
        housesDao.getHouseByName(req.params.name, function(response) {  //is this using the correct 'name' var?
            res.send(response);
        });
    },

    getHouseByUserCount: function(req, res, next) {
        housesDao.getHouseByUserCount(req.params.userCount, function(response) {  //is this using the correct 'name' var?
            res.send(response);
        });
    }
};