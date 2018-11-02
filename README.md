# Chorsey

Run these SQL commands before starting development:

CREATE DATABASE chorsey;
CREATE USER 'chorsey'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON chorsey.* TO 'chorsey'@'localhost' WITH GRANT OPTION;
USE chorsey;
CREATE TABLE chores (choreId INT NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT NULL, dueDate DATE NOT NULL, userId INT NULL, houseId INT NOT NULL, completed BOOLEAN NOT NULL default FALSE);
CREATE TABLE houses (houseId INT NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, userCount INT NOT NULL default 0);
CREATE TABLE users (userId INT NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, houseId INT NOT NULL);

See db.js

Run 'npm install' on the command line before working after receiving new code.
Run project with 'npm start' on the command line.
