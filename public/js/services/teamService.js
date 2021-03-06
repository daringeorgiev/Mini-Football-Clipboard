(function() {
    'use strict';
    app.factory('teamService', ['$http', '$window', function($http, $window) {
        var self = this;
        self.allTeams = [];
        self.selectedTeam = {};
        self.defaultTeam = {};

        function getAllTeams() {
            return $http.get('/api/teams');
        }

        function getMyTeams() {
            var req = {
                method: 'GET',
                url: '/api/teams?ownerId=' + $window.localStorage._id,
                headers: {
                    'x-access-token': $window.localStorage.token
                }
            };

            return $http(req);
        }

        function getTeamById(id) {
            return $http.get('/api/teams/' + id);
        }

        function getDefaultTeam() {
            // ToDo Should change how to get default team
            return $http.get('/api/teams');
        }

        function createTeam(team) {
            var req = team;
            req.token = $window.localStorage.token;
            return $http.post('/api/teams', req);
        }

        function deleteTeam(id) {
            var req = {
                method: 'DELETE',
                url: '/api/teams/' + id,
                headers: {
                    'x-access-token': $window.localStorage.token
                }
            };
            return $http(req);
        }

        function updateTeam(team) {
            var req = team;
            req.token = $window.localStorage.token;
            return $http.put('/api/teams/' + team._id, req);
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

        function setDefaultTeam(data) {
            self.defaultTeam = data;
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
            getDefaultTeam: getDefaultTeam,
            setDefaultTeam: setDefaultTeam,
            selectDefaultTeam: selectDefaultTeam
        };
    }]);
}());
