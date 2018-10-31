module.exports =
    "ALTER TABLE users " +
        "CHANGE userId userId INT, " +
        "CHANGE name name VARCHAR(255), " +
        "CHANGE email email VARCHAR(255), " +
        "CHANGE houseId houseId INT;";