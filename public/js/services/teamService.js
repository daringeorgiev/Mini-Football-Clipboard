/**
 * Created by darin on 5/16/2015.
 */
'use strict';
app.factory('teamService', ['$http', '$q', '$window', function ($http, $q, $window) {
    function getAllTeams() {
        return $http.get('/api/all-teams');
    }

    function getMyTeams() {
        return $http.get('/api/my-teams' + '?token' + $window.localStorage.token);
    }

    function getTeamById(id) {
        return $http.get('/api/team' + '?id=' + id);
    }

    function createTeam(team) {
        var req = team;
        req.token = $window.localStorage.token;
        return $http.post('/api/team', req);
    }

    function deleteTeam(id) {
        return $http.delete('/api/team' + id);
    }

    function updateTeam(team) {
        var req = team;
        req.token = $window.localStorage.token;
        return $http.put('/api/team', req);
    }

    return {
        getAllTeams: getAllTeams,
        getMyTeams: getMyTeams,
        getTeamById: getTeamById,
        createTeam: createTeam,
        deleteTeam: deleteTeam,
        updateTeam: updateTeam
    }
}]);