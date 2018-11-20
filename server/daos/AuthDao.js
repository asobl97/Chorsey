var firebase = require('firebase');

var auth = firebase.auth();


module.exports = {
    signUp: function(user) {

        auth.createUserWithEmailAndPassword(user.email, user.password)
            .then(function() {
                console.log("Successfully created new user:", user.email);
            })
            .catch(function(error) {
                console.log("Error creating new user:", error);
            });


    },

    logIn: function(user) {
        auth.signInWithEmailAndPassword(user.email, user.password)
            .then(function() {
                console.log("Successfully signed in:", email);
            })
            .catch(function(error) {
                console.log("Error signing in:", error);
            });
    },

    logOut: function() {
        auth.signOut().then(function() {
            console.log("Successfully signed out.");
            })
            .catch(function(error) {
                console.log("Error signing out:", error);
            });
    },

    editAccount: function(oldEmail, oldPassword, newEmail, newPassword) {

        if (auth.currentUser == null)
            auth.signInWithEmailAndPassword(oldEmail, oldPassword).catch(function(error) {
                console.log(error);
            });

        auth.currentUser.updateEmail(newEmail).catch(function(error) {
            console.log(error);
        });
        auth.currentUser.updatePassword(newPassword).catch(function(error) {
            console.log(error);
        });

        auth.signOut().catch(function(error) {
            console.log(error);
        });
    },

    deleteAccount: function(email, password) {
        if (auth.currentUser == null)
            auth.signInWithEmailAndPassword(email, password).catch(function(error) {
                console.log(error);
            });

        auth.currentUser.delete().catch(function(error) {
                console.log(error);
        });
    },

    sendResetEmail: function(email) {
        auth.sendPasswordResetEmail(email).catch(function(error) {
            console.log(error);
        });
    },

    resetPassword: function(resetCode, newPassword) {
        auth.confirmPasswordReset(resetCode, newPassword)
            .then(function() {
            console.log("Successfully reset password");
            })
            .catch(function(error) {
                console.log("Error resetting password:", error);
            });
    }
};