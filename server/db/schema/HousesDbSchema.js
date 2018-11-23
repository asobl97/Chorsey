module.exports =
    "ALTER TABLE houses " +
        "CHANGE houseId houseId INT NOT NULL AUTO_INCREMENT, " +
        "CHANGE name name VARCHAR(255) NOT NULL, " +
        "CHANGE userCount userCount INT NOT NULL default 0;";