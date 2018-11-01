module.exports =
    "ALTER TABLE users " +
        "CHANGE userId userId INT NOT NULL PRIMARY KEY, " +
        "CHANGE name name VARCHAR(255) NOT NULL, " +
        "CHANGE email email VARCHAR(255) NOT NULL, " +
        "CHANGE houseId houseId INT NOT NULL;";