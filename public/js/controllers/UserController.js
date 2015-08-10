/**
 * Created by darin on 25/7/2015.
 */
'use strict';
app.controller('UserController', ['$scope', 'userService', function($scope, userService){
    var self = this;
    self.username = '';
    self.password = '';
    self.isRegisterFormVisible = false;

    self.onLoginClick = function(){
        console.log("Login");
    };
    self.onRegisterClick = function(){
        self.isRegisterFormVisible = true;
        console.log("Register" + self.isRegisterFormVisible);
    };

    self.onCloseRegisterClick = function(){
        self.isRegisterFormVisible = false;
    }
}]);