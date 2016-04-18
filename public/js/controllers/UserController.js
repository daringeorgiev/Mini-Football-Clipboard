/**
 * Created by darin on 25/7/2015.
 */
'use strict';
app.controller('UserController', ['$scope', '$window', '$location', 'userService', 'notify',
    function ($scope, $window, $location, userService, notify) {
    var self = this;
    var minUserNameLength = 1,
        minPasswordLength = 1;
    self.user = {};
    self.user.userName = $window.localStorage.userName ? $window.localStorage.userName : '';
    self.user.password = '';
    self.isRegisterFormVisible = false;
    self.isLoggedIn = !!$window.localStorage.token;

    self.onLoginClick = function () {
        if (self.user.userName.length >= minUserNameLength && self.user.password.length >= minPasswordLength) {
            userService.loginUser(self.user.userName, self.user.password)
                .success(function (data) {
                    notify({message: 'Login successful'});
                    self.isLoggedIn = true;
                    $window.localStorage.token = data.token;
                    $window.localStorage.userName = self.user.userName;
                })
                .error(function (data) {
                    notify({message: 'Error: ' + data.message});
                    delete $window.localStorage.token;
                    delete $window.localStorage.userName;
                });
        } else {
            notify({message: 'Error: Please check your user name and password'});
        }
    };

    self.sendRegisterForm = function () {
        if (self.user.userName.length >= minUserNameLength && self.user.password.length >= minPasswordLength) {
            userService.registerUser(self.user.userName, self.user.password)
                .success(function (data) {
                    notify({message: 'Registration successful'});
                    $window.localStorage.token = data.token;
                    $window.localStorage.userName = self.user.userName;
                    self.isLoggedIn = true;
                    $location.path('#');
                })
                .error(function (data) {
                    notify({message: 'Error: ' + data.message});
                });
        } else {
            notify({message: 'Error: Please check your user name and password'});
        }
    };

    self.onLogoutClick = function () {
        self.isLoggedIn = false;
        delete $window.localStorage.token;
        delete $window.localStorage.userName;
        self.user.userName = '';
        self.user.password = '';
        notify({message: 'Logout successful'});
    };
}]);
