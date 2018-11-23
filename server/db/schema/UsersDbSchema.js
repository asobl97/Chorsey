module.exports =
    "ALTER TABLE users " +
        "CHANGE userId userId VARCHAR(32) NOT NULL, " +
        "CHANGE name name VARCHAR(255) NOT NULL, " +
        // "DROP COLUMN email, " + //1) Uncomment this line. 2) Run npm start. 3) Recomment this line.  <-- do this once
        "CHANGE houseId houseId INT NULL;";