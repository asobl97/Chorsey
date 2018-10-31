module.exports =
    "ALTER TABLE houses " +
        "CHANGE houseId houseId INT ," +
        "CHANGE name name VARCHAR(255) ," +
        "CHANGE userCount userCount INT;";