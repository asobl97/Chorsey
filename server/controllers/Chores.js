var choresDao = require('../daos/ChoresDao.js');

module.exports = {
    getChores: function(req, res, next) {
        choresDao.getAllChores(function(response) {
            res.send(response);
        });
    },

    getChoreById: function(req, res, next) {
        choresDao.getChoreById(req.params.choreId, function(response) {
            res.send(response);
        });
    },

    getChoresByUserId: function(req, res, next) {
        choresDao.getChoresByUserId(req.params.userId, function(response) {
            res.send(response);
        });
    },

    getChoresByHouseId: function(req, res, next) {
        choresDao.getChoresByHouseId(req.params.houseId, function(response) {
            res.send(response);
        });
    },

    getCompletedChoresByHouseId: function(req, res, next) {
        choresDao.getCompletedChoresByHouseId(req.params.houseId, function(response) {
            res.send(response);
        });
    },

    getUncompletedChoresByHouseId: function(req, res, next) {
        choresDao.getUncompletedChoresByHouseId(req.params.houseId, function(response) {
            res.send(response);
        });
    },

    createChore: function(req, res, next) {
        var chore;

        //TBD

        choresDao.insertChore(chore, function(response) {
            res.send(response);
        });
    },

    updateChore: function(req, res, next) {
        choresDao.getChoreById(req.params.choreId, function(chore) {
            if (chore == null) {
                throw new Error("Found no chore with ID: " + req.params.choreId)
            }

            //TBD

            choresDao.updateChore(chore, function(response) {
                res.send(response);
            });
        });
    },

    deleteChore: function(req, res, next) {
        choresDao.getChoreById(req.params.choreId, function(chore) {
            if (chore == null) {
                throw new Error("Found no chore with ID: " + req.params.choreId)
            }

            choresDao.deleteChore(chore, function(response) {
                res.send(response);
            });
        });
    }
};