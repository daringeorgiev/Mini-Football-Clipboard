(function() {
    'use strict';
    app.controller('UserController', ['$scope', '$window', '$location', 'userService', 'notify',
        function ($scope, $window, $location, userService, notify) {
        var self = this;
        var minUserNameLength = 5,
            minPasswordLength = 6;

        self.user = userService.getUser();
        self.isRegisterFormVisible = false;

        self.onLoginClick = function () {
            if (self.user.userName && self.user.userName.length >= minUserNameLength &&
                self.user.password && self.user.password.length >= minPasswordLength) {
                userService.loginUser(self.user.userName, self.user.password)
                    .then(function successCallback(res) {
                        userService.setUser(res.data);
                        notify({message: 'Login successful'});
                    }, function errorCallback(res) {
                        userService.logoutUser();
                        notify({message: 'Error: ' + res.data.message});
                    });
            } else {
                notify({message: 'Error: Please check your user name and password'});
            }
        };

        self.sendRegisterForm = function () {
            if (self.user.userName && self.user.userName.length >= minUserNameLength &&
                self.user.password && self.user.password.length >= minPasswordLength) {
                userService.registerUser(self.user.userName, self.user.password)
                    .then(function successCallback(res) {
                        $location.path('#');
                        userService.setUser(res.data);
                        notify({message: 'Registration successful'});
                    }, function errorCallback(res) {
                        userService.logoutUser();
                        notify({message: 'Error: ' + res.data.message});
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
}());
