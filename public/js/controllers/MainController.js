'use strict';
app.controller('MainController', ['$scope', 'teamService', 'notify', function ($scope, teamService, notify) {
    var self = this;

    self.getAllTeams = function () {
        teamService.getAllTeams()
            .success(function (data) {
                console.log("Contr: " + data);
                //notify({message: 'Update successful', classes: 'alert-danger'});
                self.allTeams = data;
                self.selectedTeam = self.allTeams[0];
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    self.createTeam = function () {
        teamService.createTeam(self.selectedTeam)
            .success(function (data) {
                self.selectedTeam = data
            })
            .error(function (data) {
                console.log("Error: " + data)
            });
    };

    self.addPlayer = function () {
        var count = self.selectedTeam.players.length;
        self.selectedTeam.players.push({
            playerName: 'PlayerRRR' + (count + 1),
            playerNumber: count + 1
        });
        self.selectedTeam.playersCount++;
    };

    self.removePlayer = function () {
        self.selectedTeam.players.splice(self.selectedTeam.players.length - 1, 1);
        self.selectedTeam.playersCount--;
    };

    self.deleteTeam = function () {
        teamService.deleteTeam(self.selectedTeam._id)
            .success(function (data) {
                console.log("Delete: " + data);
                self.allTeams = data;
                if (self.allTeams) {
                    self.selectedTeam = self.allTeams[0];
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    self.updateTeam = function () {
        teamService.updateTeam(self.selectedTeam)
            .success(function (data) {
                self.selectedTeam = data;
                notify({message: 'Team: ' + data.teamName + '\n Updated successful', classes: 'alert-danger', position: 'left'});
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}]);