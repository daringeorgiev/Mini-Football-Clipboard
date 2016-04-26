/**
 * Created by darin on 25/7/2015.
 */

app.factory('userService', ['$http', '$window', function ($http, $window) {
    'use strict';
    var self = this;

    self.user = JSON.parse($window.localStorage.getItem('user'));
    self.user = self.user ? self.user : {};
    self.user.loggedIn = !!self.user.userName;

    function loginUser(userName, password) {
        return $http.post('api/login', {'name': userName, 'password': password});
    }

    function registerUser(userName, password) {
        return $http.post('api/register', {'name': userName, 'password': password});
    }

    function setUser(data) {
        self.user = {
            loggedIn : true,
            userName : data.userName,
            _id : data._id,
            token : data.token
        };

        var localStorageUser = {
            userName : data.userName,
            _id : data._id,
            token : data.token
        };
        $window.localStorage.setItem('user', JSON.stringify(localStorageUser));

        return self.user;
    }

    function getUser() {
        return self.user;
    }

    function logoutUser(userNama) {
        // remove user props
        for (var prop in self.user) delete self.user[prop];
        $window.localStorage.clear();
    }

    return {
        loginUser: loginUser,
        registerUser: registerUser,
        setUser: setUser,
        getUser: getUser,
        logoutUser: logoutUser
    };
}]);
