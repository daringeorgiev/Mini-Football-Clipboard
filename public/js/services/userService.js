/**
 * Created by darin on 25/7/2015.
 */

app.factory('userService', ['$http', function ($http) {
    'use strict';
    function loginUser(userName, password) {
        return $http.post('api/login', {'name': userName, 'password': password});
    }

    function registerUser(userName, password) {
        return $http.post('api/register', {'name': userName, 'password': password});
    }

    function logoutUser(userNama) {
        // ToDo
    }

    return {
        loginUser: loginUser,
        registerUser: registerUser,
        logoutUser: logoutUser
    };
}]);
