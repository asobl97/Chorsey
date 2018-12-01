var firebase = require('../db/firebase.js');

module.exports = {
    getCurrentUser: function(response) {
        if (firebase.currentUser == null) {
            console.log("Must be logged in to get current user.");
        }

        response(firebase.currentUser);
    },

    signUp: function(user, response) {
        firebase.createUserWithEmailAndPassword(user.email, user.password)
            .then(function() {
                console.log("Successfully created new user: ", user.email);
                response(firebase.currentUser);
            })
            .catch(function(error) {
                console.log("Error creating new user:", error);
                response(null);
            });
    },

    logIn: function(email, password, response) {
        firebase.signInWithEmailAndPassword(email, password)
            .then(function() {
                console.log("Successfully signed in: ", email);
                response(firebase.currentUser);
            })
            .catch(function(error) {
                console.log("Error signing in:", error);
                response(null);
            });
    },

    logOut: function(response) {
        firebase.signOut()
            .then(function() {
                console.log("Successfully signed out.");
                response("Successfully signed out.");
            })
            .catch(function(error) {
                console.log("Error signing out:", error);
                response(null);
            });
    },

    editAccount: function(newEmail, newPassword, response) {
        if (firebase.currentUser == null) {
            console.log("Must be logged in to edit account.");
            response("Unauthorized");
        }

        firebase.currentUser.updateEmail(newEmail)
            .then(function() {
                firebase.currentUser.updatePassword(newPassword)
                    .then(function() {
                        console.log("Successfully updated: ", newEmail);
                        response(firebase.currentUser);
                    })
                    .catch(function(error) {
                        console.log(error);
                        response(null);
                    });
            })
            .catch(function(error) {
                console.log(error);
                response(null);
            });
    },

    deleteAccount: function(response) {
        if (firebase.currentUser == null) {
            console.log("Must be logged in to delete account.");
            response("Unauthorized");
        }

        firebase.currentUser.delete()
            .then(function() {
                console.log("Successfully deleted user");
                response(firebase.currentUser);
            })
            .catch(function(error) {
                console.log(error);
                response(null);
            });
    },

    sendResetEmail: function(email, response) {
        firebase.sendPasswordResetEmail(email)
            .then(function() {
                console.log("Successfully sent password reset email");
                response("Successfully sent password reset email");
            })
            .catch(function(error) {
                console.log(error);
                response(null);
            });
    },

    resetPassword: function(resetCode, newPassword, response) {
        firebase.confirmPasswordReset(resetCode, newPassword)
            .then(function() {
                console.log("Successfully reset password");
                response("Successfully reset password");
            })
            .catch(function(error) {
                console.log("Error resetting password:", error);
                response(null);
            });
    }
};