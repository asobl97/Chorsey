var firebase = require('firebase');

firebase.initializeApp({
    apiKey: "AIzaSyCFevQcoW3T0vL18vyVmN4vDoyzTAYrjJA",
    databaseURL: "https://chorsey-16ce5.firebaseio.com"
});

var auth = firebase.auth();

module.exports = auth;