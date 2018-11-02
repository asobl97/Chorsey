var usersDao = require('../daos/UsersDao.js');

module.exports = {
    getAllUsers: function(req, res, next) {
        usersDao.getAllUsers(function(response) {
            res.send(response);
        });
    },

    getUserById: function(req, res, next) {
        usersDao.getUserById(req.params.userId, function(response) {
            res.send(response);
        });
    },

    getUserByName: function(req, res, next) {
        usersDao.getUserByName(req.params.name, function(response) {
            res.send(response);
        });
    },

    getUserByHouseId: function (req, res, next) {
        usersDao.getUserByHouseId(req.params.houseId, function(response) {
            res.send(response);
        });
    }
};