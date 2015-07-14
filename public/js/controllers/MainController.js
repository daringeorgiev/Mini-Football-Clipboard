'use strict';
app.controller('MainController', ['$scope', 'teamService', 'notify', function ($scope, teamService, notify) {
    var self = this;

    self.getAllTeams = function () {
        teamService.getAllTeams()
            .success(function (data) {
                console.log("Contr: " + data);
                self.allTeams = data;
                self.team = self.allTeams[0];
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    self.createTeam = function () {
        teamService.createTeam(self.team)
            .success(function (data) {
                self.team = data
            })
            .error(function (data) {
                console.log("Error: " + data)
            });
    };

    self.addPlayer = function () {
        var count = self.team.players.length;
        self.team.players.push({
            playerName: 'PlayerRRR' + (count + 1),
            playerNumber: count + 1
        });
        self.team.playersCount++;
    };

    self.removePlayer = function () {
        self.team.players.splice(self.team.players.length - 1, 1);
        self.team.playersCount--;
    };

    self.deleteTeam = function () {
        teamService.deleteTeam(self.team._id)
            .success(function (data) {
                console.log("Delete: " + data);
                self.allTeams = data;
                if (self.allTeams) {
                    self.team = self.allTeams[0];
                }
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    self.updateTeam = function () {
        teamService.updateTeam(self.team)
            .success(function (data) {
                self.team = data;
                console.log(data.teamName);
                notify({message: 'Update successful', classes: 'alert-danger'});
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

}]);