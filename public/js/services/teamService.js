/**
 * Created by darin on 5/16/2015.
 */
'use strict';
app.factory('teamService', ['$http', '$q', function ($http, $q) {
    function getAllTeams() {
        return $http.get('/api/all-teams')
    }

    function createTeam(team) {
        return $http.post('/api/team', team)
    }

    function deleteTeam(id) {
        return $http.delete('/api/teams' + id)
    }

    function updateTeam(team) {
        return $http.put('/api/team', team)
    }

    return {
        getAllTeams: getAllTeams,
        createTeam: createTeam,
        deleteTeam: deleteTeam,
        updateTeam: updateTeam
    }
}])