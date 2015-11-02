/**
 * Created by darin on 25/7/2015.
 */
'use strict';
app.controller('UserController', ['$scope', 'userService', 'notify', function($scope, userService, notify){
    var self = this;
    self.user = {};
    self.user.userName = '';
    self.user.password = '';
    self.isRegisterFormVisible = false;

    self.onLoginClick = function () {
        if (self.user.userName.length >= 5 && self.user.password.length >= 6) {
            userService.loginUser(self.user.userName, self.user.password)
                .success(function (data) {
                    console.log("Token: " + data.token);
                    notify({message: 'Login successful'});
                })
                .error(function (data) {
                    notify({message: 'Error: ' + data.message});
                });
        } else {
            notify({message: 'Error: Please check your user name and password'});
        }
    };

    self.onRegisterClick = function(){
        self.isRegisterFormVisible = true;
    };

    self.sendRegisterForm = function (){
        if (self.user.userName.length >= 1 && self.user.password.length >= 1) {
            userService.registerUser(self.user.userName, self.user.password)
                .success(function (data) {
                    console.log("Token: " + data.token);
                    notify({message: 'Registration successful'});
                })
                .error(function (data) {
                    notify({message: 'Error: ' + data.message});
                });
        } else {
            notify({message: 'Error: Please check your user name and password'});
        }
    };

    self.onCloseRegisterClick = function(){
        self.isRegisterFormVisible = false;
    }
}]);