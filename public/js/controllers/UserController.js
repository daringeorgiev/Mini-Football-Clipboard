/**
 * Created by darin on 25/7/2015.
 */
'use strict';
app.controller('UserController', ['$scope', '$window', 'userService', 'notify', function ($scope, $window, userService, notify) {
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
                    notify({message: 'Login successful'});
                    self.isLoggedIn = true;
                    $window.localStorage.token = data.token;
                })
                .error(function (data) {
                    notify({message: 'Error: ' + data.message});
                    delete $window.localStorage.token;
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
                    notify({message: 'Registration successful'});
                    $window.localStorage.token = data.token;
                    self.isLoggedIn = true;
                    self.onCloseRegisterClick();
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
        delete $window.localStorage.token;
        self.user.userName = '';
        self.user.password = '';
        notify({message: 'Logout successful'});
    };
}]);