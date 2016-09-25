(function() {
    'use strict';
    app.controller('MainController', ['$scope', '$rootScope', '$route','$routeParams', '$location', 'teamService', 'userService', 'notify',
        function ($scope, $rootScope, $route, $routeParams, $location, teamService, userService,notify) {
        var self = this;

        self.isEditTeamVisible = false;
        self.isSaveAsTeamVisible = false;
        //Edit parameters
        self.selectTeamInputValue = '';
        self.editTeamName = '';
        self.editPlayersCount = '';

        self.teamsSectionOpen = true;
        self.playersSectionOpen = true;

        self.user = userService.getUser();
        self.selectedTeam = teamService.getSelectedTeam();
        self.allTeams = teamService.getStoredTeams();

        self.selectTeamOnLoad = function() {
            teamService.getDefaultTeam()
                .then(function successCallback(res) {
                    // ToDo Should change how to get default teamx
                    teamService.setDefaultTeam(res.data[0]);
                    // Check url for team id
                    if ($location.search().id) {
                        self.setTeamById($location.search().id);
                    } else {
                        teamService.selectDefaultTeam();
                    }
                }, function errorCallback(res) {
                    notify({
                        message: 'Error: ' + res.data,
                        classes: 'alert-danger'
                    });
                });
        }();

        self.onAllTeamsClick = function() {
            teamService.getAllTeams()
                .then(function successCallback(res) {
                    teamService.setStoredTeams(res.data);
                    self.selectedTeamGetterSetter('');
                }, function errorCallback(res) {
                    self.selectedTeamGetterSetter('');
                    console.log('Error: ' + JSON.stringify(res.data));
                });
        };

        self.onMyTeamsClick = function() {
            teamService.getMyTeams()
                .then(function successCallback(res) {
                    teamService.setStoredTeams(res.data);
                    self.selectedTeamGetterSetter('');
                }, function errorCallback(res) {
                    self.selectedTeamGetterSetter('');
                    console.log('Error: ' + JSON.stringify(res.data));
                });
        };

        self.createNewTeam = function () {
            teamService.createTeam(self.newTeam)
                .then(function successCallback(res) {
                    teamService.setSelectedTeam(res.data);
                    self.isSaveAsTeamVisible = false;
                    self.allTeams.push(res.data);
                    self.changeTeamColors();
                    $location.path('/');
                    $location.search('id', self.selectedTeam._id);
                    notify({message: 'Team: ' + res.data.teamName + '\n created successful'});
                }, function errorCallback(res) {
                    notify({
                        message: 'Error: ' + res.data,
                        classes: 'alert-danger'
                    });
                    console.log("Error: " + res.data);
                });
        };

        self.updateTeam = function () {
            teamService.updateTeam(self.selectedTeam)
                .then(function successCallback(res) {
                    teamService.setSelectedTeam(res.data);
                    self.changeTeamColors();
                    self.isEditTeamVisible = false;
                    $location.path('/');
                    $location.search('id', self.selectedTeam._id);
                    // notify({message: 'Team: ' + data.teamName + '\n Updated successful', classes: 'noty', position: 'center'});
                }, function errorCallback(res) {
                    notify({
                        message: 'Error: ' + res.data,
                        classes: 'alert-danger'
                    });
                    console.log("Error: " + res.data);
                });
        };

        self.deleteTeam = function () {
            if (confirm('Are you sure you want to delete ' + self.selectedTeam.teamName + ' team?')) {
                teamService.deleteTeam(self.selectedTeam._id)
                    .then(function successCallback(res) {
                        teamService.setStoredTeams(res.data);
                        if (self.allTeams) {
                            teamService.selectDefaultTeam();
                        }
                        $location.path('/');
                        self.selectedTeamGetterSetter('');
                        notify({message: 'Team deleted successful'});
                    }, function errorCallback(res) {
                        notify({
                            message: 'Error: ' + res.data,
                            classes: 'alert-danger'
                        });
                        console.log("Error: " + res.data);
                    });
            }
        };

        self.setTeamById = function (id) {
            teamService.getTeamById(id)
                .then(function successCallback(res) {
                    teamService.setSelectedTeam(res.data);
                    self.changeTeamColors();
                    // notify({message: 'Team: ' + res.data.teamName + '\n loaded successful', classes: 'noty', position: 'center'});
                }, function errorCallback(res) {
                    notify({
                        message: 'Error: ' + res.data,
                        classes: 'alert-danger'
                    });
                    console.log("Error: " + res.data);
                });
        };

        self.changeSelectedTeam = function(team) {
            teamService.setSelectedTeam(team);
            self.changeTeamColors();
            $location.search('id', self.selectedTeam._id);
        };

        self.selectedTeamGetterSetter = function(newInputValue) {
            if (arguments.length) {
                self.selectTeamInputValue = newInputValue || '';
            }
            return self.selectTeamInputValue;
        };

        // Set selected team id as URL parameter
        $rootScope.$on('$routeChangeStart', function(next, last) {
            if ($location.path() === '/' && self.selectedTeam._id) {
                $location.search('id', self.selectedTeam._id);
            }
        });

        self.changeTeamColors = function () {
            setTimeout(function () {
                jQuery('.field__player').css({
                    'background-color': self.selectedTeam.colors ? self.selectedTeam.colors.mainColor : 'blue',
                    'color' : self.selectedTeam.colors? self.selectedTeam.colors.secondColor : 'yellow'
                });

                jQuery('.field__goalkeeper').css({
                    'background-color': self.selectedTeam.colors ? self.selectedTeam.colors.gkMainColor : 'red',
                    'color' : self.selectedTeam.colors ? self.selectedTeam.colors.gkSecondColor : 'white'
                });

                jQuery('.ribbon').css({
                    'background-color': self.selectedTeam.colors ? self.selectedTeam.colors.mainColor : 'blue',
                    'color' : self.selectedTeam.colors? self.selectedTeam.colors.secondColor : 'yellow'
                });
            }, 1);
        };

        // Add/Remove player
        self.addPlayer = function (team) {
            var count = team.players.length;
            team.players.push({
                playerName: 'Player' + (count + 1),
                playerNumber: count + 1
            });
            team.playersCount++;
        };

        self.removePlayerByIndex = function (team, index){
            team.players.splice(index, 1);
            team.playersCount--;
        };

        //Create New Team
        self.onCreateNewTeamClick = function () {
            self.newTeam = JSON.parse(JSON.stringify(self.allTeams[0]));
            self.newTeam.teamName = 'New Team';
        };

        self.onCreateNewTeamCancelClick = function () {
            self.newTeam = null;
        };

        //Edit Team
        self.onEditTeamClick = function () {
            self.isEditTeamVisible = true;
            self.editTeamName = self.selectedTeam.teamName;
            self.editPlayersCount = self.selectedTeam.playersCount;
        };

        self.onEditTeamUpdateClick = function () {
            self.selectedTeam.teamName = self.editTeamName;
            self.selectedTeam.playersCount = self.editPlayersCount;
            self.updateTeam();
        };

        //Save As Tea,
        self.onSaveAsTeamClick = function () {
            self.isSaveAsTeamVisible = true;
            self.editTeamName = self.selectedTeam.teamName;
            self.editPlayersCount = self.selectedTeam.playersCount;
        };

        self.onSaveAsTeamSaveClick = function () {
            self.newTeam = JSON.parse(JSON.stringify(self.selectedTeam));
            self.newTeam.teamName = self.selectedTeam.teamName;
            self.createNewTeam();
        };

        self.onEditTeamCancelClick = function () {
            self.editTeamName = "";
            self.editPlayersCount = "";
            self.isEditTeamVisible = false;
            self.isSaveAsTeamVisible = false;
        };
    }]);
}());
