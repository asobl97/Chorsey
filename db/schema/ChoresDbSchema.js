module.exports =
    "ALTER TABLE chores " +
        "CHANGE choreId choreId INT, " +
        "CHANGE name name VARCHAR(255), " +
        "CHANGE description description TEXT, " +
        "CHANGE dueDate dueDate DATE, " +
        "CHANGE userId userId INT, " +
        "CHANGE houseId houseId INT, " +
        "CHANGE completed completed BOOLEAN default FALSE;";
        //completed
        //repeating_type
        //future_assign