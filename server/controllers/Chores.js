var choresDao = require('../daos/ChoresDao.js');
var util = require('../utils/util.js');

module.exports = {
    getChores: function(req, res, next) {
        if (util.isNotEmpty(req.query)) {
            choresDao.getChoresByFilter(req.query, function (response) {
                res.send(response);
            });
        } else {
            choresDao.getAllChores(function (response) {
                res.send(response);
            });
        }
    },

    getChoreById: function(req, res, next) {
        choresDao.getChoreById(req.params.choreId, function(response) {
            if (response == null) {
                res.status(204).send("Found no chore with ID: " + req.params.choreId);
            } else {
                res.send(response);
            }
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

    createChore: function(req, res, next) {
        var chore = {};
        chore.choreId = req.body.choreId;
        chore.name = req.body.name;
        chore.description = req.body.description;
        chore.dueDate = req.body.dueDate;
        chore.userId = req.body.userId;
        chore.houseId = req.body.houseId;
        chore.completed = req.body.completed;

        choresDao.insertChore(chore, function(response) {
            if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    },

    updateChore: function(req, res, next) {
        choresDao.getChoreById(req.params.choreId, function(chore) {
            if (chore == null) {
                res.status(204).send("Found no chore with ID: " + req.params.choreId);
                return;
            }

            chore.choreId = req.body.choreId;
            chore.name = req.body.name;
            chore.description = req.body.description;
            chore.dueDate = req.body.dueDate;
            chore.userId = req.body.userId;
            chore.houseId = req.body.houseId;
            chore.completed = req.body.completed;

            choresDao.updateChore(chore, function(response) {
                if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        });
    },

    deleteChore: function(req, res, next) {
        choresDao.getChoreById(req.params.choreId, function(chore) {
            if (chore == null) {
                res.status(204).send("Found no chore with ID: " + req.params.choreId);
                return;
            }

            choresDao.deleteChore(chore, function(response) {
                if ((util.isEmpty(response)) || (response.affectedRows != 1)) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        });
    }
};