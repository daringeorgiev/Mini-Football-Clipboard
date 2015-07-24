/**
 * Created by darin on 25/7/2015.
 */
'use strict';
app.factory('userService', ['$http', function($http){
    function loginUser(){
        return "Go"
    }
    return {
        loginUser: loginUser
    }

}]);