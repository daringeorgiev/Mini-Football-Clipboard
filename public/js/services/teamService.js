(function() {
    'use strict';
    app.factory('teamService', ['$http', '$window', function($http, $window) {
        var self = this;
        self.allTeams = [];
        self.selectedTeam = {};
        self.defaultTeam = {};

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
            };

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

        function setStoredTeams(data) {
            self.allTeams.length = 0;
            data.forEach(function(team) {
                self.allTeams.push(team);
            });
            self.defaultTeam = data[0];
        }

        function getStoredTeams() {
            return self.allTeams;
        }

        function setSelectedTeam(data) {
            self.selectedTeam._id = data._id;
            self.selectedTeam.teamName = data.teamName;
            self.selectedTeam.ownerId = data.ownerId;
            self.selectedTeam.players = data.players;
            self.selectedTeam.colors = data.colors;
            self.selectedTeam.isPrivate = data.isPrivate;
            self.selectedTeam.playersCount = data.playersCount;
        }

        function getSelectedTeam() {
            return self.selectedTeam;
        }

        function selectDefaultTeam() {
            this.setSelectedTeam(self.defaultTeam);
        }

        return {
            getAllTeams: getAllTeams,
            getMyTeams: getMyTeams,
            getTeamById: getTeamById,
            createTeam: createTeam,
            deleteTeam: deleteTeam,
            updateTeam: updateTeam,
            setStoredTeams: setStoredTeams,
            getStoredTeams: getStoredTeams,
            getSelectedTeam: getSelectedTeam,
            setSelectedTeam: setSelectedTeam,
            selectDefaultTeam: selectDefaultTeam
        };
    }]);
}());
