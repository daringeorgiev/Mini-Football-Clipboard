'use strict';
app.controller('MainController', ['$scope', 'teamService', 'notify', function ($scope, teamService, notify) {
    var self = this;
    self.isCreateNewTeamVisible = false;

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
    }();

    self.createNewTeam = function () {
        teamService.createTeam(self.newTeam)
            .success(function (data) {
                self.selectedTeam = data;
                self.isCreateNewTeamVisible = false;
                self.allTeams.push(data);
            })
            .error(function (data) {
                console.log("Error: " + data)
            });
    };

    self.addPlayer = function (team) {
        var count = team.players.length;
        team.players.push({
            playerName: 'Player' + (count + 1),
            playerNumber: count + 1
        });
        team.playersCount++;
    };

    self.removePlayer = function (team) {
        team.players.splice(team.players.length - 1, 1);
        team.playersCount--;
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
                //self.selectedTeam = data;
                //notify({message: 'Team: ' + data.teamName + '\n Updated successful', classes: 'alert-danger', position: 'left'});
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    self.onCreateNewTeamClick = function () {
        self.isCreateNewTeamVisible = true;
        self.newTeam = JSON.parse(JSON.stringify(self.allTeams[0]));
        self.newTeam.teamName = 'New Team';
    };

    self.onCreateNewTeamCancelClick = function () {
        self.isCreateNewTeamVisible = false;
    };

    ////Hack for resizing
    //self.setDragableAreaWidth = function () {
    //    $('.draggableArea').width($('.imgField').width() - $('.player').width());
    //    $('.draggableArea').css({left: $('.imgField').position().left});
    //    $(window).on('resize', function () {
    //        $('.draggableArea').width($('.imgField').width() - $('.player').width());
    //        $('.draggableArea').css({left: $('.imgField').position().left});
    //    });
    //}();

    //ng-sortable
    //$scope.dragControlListeners = {
    //    accept: function (sourceItemHandleScope, destSortableScope) {
    //        console.log("accept");
    //        return boolean
    //    },
    //    //override to determine drag is allowed or not. default is true.
    //    itemMoved: function (event) {
    //        console.log("move");
    //    },
    //    //Do what you want},
    //    orderChanged: function (event) {
    //        console.log("oredr");
    //    },
    //    //Do what you want},
    //    containment: '#board'//optional param.
    //};
    //
    //$scope.sortableOptions = {
    //
    //}
    //$scope.dropControlListeners = {
    //    accept: function (sourceItemHandleScope, destSortableScope) {
    //        console.log("accept");
    //        return boolean
    //    },
    //    //override to determine drag is allowed or not. default is true.
    //    itemMoved: function (event) {
    //        console.log("move");
    //    },
    //    //Do what you want},
    //    orderChanged: function (event) {
    //        console.log("oredr");
    //    },
    //    //Do what you want},
    //    containment: '#board'//optional param.
    //}

}]);