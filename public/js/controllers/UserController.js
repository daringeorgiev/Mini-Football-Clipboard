/**
 * Created by darin on 25/7/2015.
 */
'use strict';
app.controller('UserController', ['$scope', 'userService', 'notify', function ($scope, userService, notify) {
    var self = this;
    var minUserNameLength = 1,
        minPasswordLength = 1;
    self.user = {};
    self.user.userName = '';
    self.user.password = '';
    self.isRegisterFormVisible = false;
    self.isLoggedIn = false;

    self.onLoginClick = function () {
        if (self.user.userName.length >= minUserNameLength && self.user.password.length >= minPasswordLength) {
            userService.loginUser(self.user.userName, self.user.password)
                .success(function (data) {
                    console.log("Token: " + data.token);
                    notify({message: 'Login successful'});
                    self.isLoggedIn = true;
                })
                .error(function (data) {
                    notify({message: 'Error: ' + data.message});
                });
        } else {
            notify({message: 'Error: Please check your user name and password'});
        }
    };

    self.onRegisterClick = function () {
        self.isRegisterFormVisible = true;
    };

    self.sendRegisterForm = function () {
        if (self.user.userName.length >= minUserNameLength && self.user.password.length >= minPasswordLength) {
            userService.registerUser(self.user.userName, self.user.password)
                .success(function (data) {
                    console.log("Token: " + data.token);
                    notify({message: 'Registration successful'});
                    self.isLoggedIn = true;
                })
                .error(function (data) {
                    notify({message: 'Error: ' + data.message});
                });
        } else {
            notify({message: 'Error: Please check your user name and password'});
        }
    };

    self.onCloseRegisterClick = function () {
        self.isRegisterFormVisible = false;
    };

    self.onLogoutClick = function () {
        self.isLoggedIn = false;
        notify({message: 'Logout successful'});
    };
}]);