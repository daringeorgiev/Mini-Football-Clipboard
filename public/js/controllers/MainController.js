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
                .success(function(data) {
                    // ToDo Should change how to get default team
                    teamService.setDefaultTeam(data[0]);
                    // Check url for team id
                    if ($location.search().id) {
                        self.setTeamById($location.search().id);
                    } else {
                        teamService.selectDefaultTeam();
                    }
                })
                .error(function(data) {
                    notify({
                        message: 'Error: ' + data
                    });
                });
        }();

        self.onAllTeamsClick = function() {
            teamService.getAllTeams()
                .success(function(data) {
                    teamService.setStoredTeams(data);
                    self.selectedTeamGetterSetter('');
                })
                .error(function(data) {
                    console.log('Error: ' + JSON.stringify(data));
                });
        };

        self.onMyTeamsClick = function() {
            teamService.getMyTeams()
                .success(function(data) {
                    teamService.setStoredTeams(data);
                    self.selectedTeamGetterSetter('');
                })
                .error(function(data) {
                    self.selectedTeamGetterSetter('');
                    console.log('Error: ' + JSON.stringify(data));
                });
        };

        self.createNewTeam = function () {
            teamService.createTeam(self.newTeam)
                .success(function (data) {
                    teamService.setSelectedTeam(data);
                    self.isSaveAsTeamVisible = false;
                    self.allTeams.push(data);
                    self.changeTeamColors();
                    $location.path('/');
                    $location.search('id', self.selectedTeam._id);
                    notify({message: 'Team: ' + data.teamName + '\n created successful'});
                })
                .error(function (data) {
                    notify({message: 'Error: ' + data});
                    console.log("Error: " + data);
                });
        };

        self.updateTeam = function () {
            teamService.updateTeam(self.selectedTeam)
                .success(function (data) {
                    teamService.setSelectedTeam(data);
                    self.changeTeamColors();
                    self.isEditTeamVisible = false;
                    $location.path('/');
                    $location.search('id', self.selectedTeam._id);
                    notify({message: 'Team: ' + data.teamName + '\n Updated successful', classes: 'noty', position: 'center'});
                })
                .error(function (data) {
                    notify({message: 'Error: ' + data});
                    console.log('Error: ' + data);
                });
        };

        self.deleteTeam = function () {
            if (confirm('Are you sure you want to delete ' + self.selectedTeam.teamName + ' team?')) {
                teamService.deleteTeam(self.selectedTeam._id)
                    .success(function (data) {
                        console.log("Delete: " + data);
                        teamService.setStoredTeams(data);
                        if (self.allTeams) {
                            teamService.selectDefaultTeam();
                        }
                        $location.path('/');
                        self.selectedTeamGetterSetter('');
                        notify({message: 'Team deleted successful'});
                    })
                    .error(function (data) {
                        notify({message: 'Error: ' + data});
                        console.log('Error: ' + data);
                    });
            }
        };

        self.setTeamById = function (id) {
            teamService.getTeamById(id)
                .success(function (data) {
                    teamService.setSelectedTeam(data);
                    self.changeTeamColors();
                    notify({message: 'Team: ' + data.teamName + '\n loaded successful', classes: 'noty', position: 'center'});
                })
                .error(function (data) {
                    notify({message: 'Error: ' + data});
                    console.log('Error: ' + data);
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
                jQuery('.player').css({
                    'background-color': self.selectedTeam.colors ? self.selectedTeam.colors.mainColor : 'blue',
                    'color' : self.selectedTeam.colors? self.selectedTeam.colors.secondColor : 'yellow'
                });

                jQuery('.goalKeeper').css({
                    'background-color': self.selectedTeam.colors ? self.selectedTeam.colors.gkMainColor : 'red',
                    'color' : self.selectedTeam.colors ? self.selectedTeam.colors.gkSecondColor : 'white'
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
            self.newTeam.teamName = self.editTeamName;
            self.newTeam.playersCount = self.editPlayersCount;
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
