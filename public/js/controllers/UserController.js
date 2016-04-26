/**
 * Created by darin on 25/7/2015.
 */
'use strict';
app.controller('UserController', ['$scope', '$window', '$location', 'userService', 'notify',
    function ($scope, $window, $location, userService, notify) {
    var self = this;
    var minUserNameLength = 1,
        minPasswordLength = 1;

    self.user = userService.getUser();
    self.isRegisterFormVisible = false;

    self.onLoginClick = function () {
        if (self.user.userName.length >= minUserNameLength && self.user.password.length >= minPasswordLength) {
            userService.loginUser(self.user.userName, self.user.password)
                .success(function (data) {
                    self.user = userService.setUser(data);
                    notify({message: 'Login successful'});
                })
                .error(function (data) {
                    userService.logoutUser();
                    notify({message: 'Error: ' + data.message});
                });
        } else {
            notify({message: 'Error: Please check your user name and password'});
        }
    };

    self.sendRegisterForm = function () {
        if (self.user.userName.length >= minUserNameLength && self.user.password.length >= minPasswordLength) {
            userService.registerUser(self.user.userName, self.user.password)
                .success(function (data) {
                    $location.path('#');
                    self.user = userService.setUser(data);
                    notify({message: 'Registration successful'});
                })
                .error(function (data) {
                    userService.logoutUser();
                    notify({message: 'Error: ' + data.message});
                });
        } else {
            notify({message: 'Error: Please check your user name and password'});
        }
    };

    self.onLogoutClick = function () {
        userService.logoutUser();
        notify({message: 'Logout successful'});
    };
}]);
