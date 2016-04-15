/**
 * Created by darin on 5/16/2015.
 */
app.factory('teamService', ['$http', '$q', '$window', function ($http, $q, $window) {
    'use strict';
    function getAllTeams() {
        return $http.get('/api/all-teams');
    }

    function getMyTeams() {
        var req = {
            method: 'GET',
            url: '/api/my-teams',
            headers: {
                'x-access-token': $window.localStorage.token
            }
        }

        return $http(req);
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
    };
}]);
