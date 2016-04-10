
app.controller('MainController', ['$scope', '$route','$routeParams', '$location', 'teamService', 'notify',
    function ($scope, $route, $routeParams, $location, teamService, notify) {
    'use strict';
    var self = this,
        _selectTeamInputValue = '';

    self.isCreateNewTeamVisible = false;
    self.isEditTeamVisible = false;
    self.isSaveAsTeamVisible = false;
    //Edit parameters
    self.searchText = '';
    self.editTeamName = '';
    self.editPlayersCount = '';

    self.getAllTeams = function () {
        teamService.getAllTeams()
            .success(function (data) {
                //console.log("Contr: " + data);
                //notify({message: 'Update successful', classes: 'alert-danger'});
                self.allTeams = data;
                self.selectedTeam = self.allTeams[0];
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }();

    self.changeSelectedTeam = function (team) {
        self.selectedTeam = team;
        self.changeTeamColors();
        $location.search('id', self.selectedTeam._id);
    };

    self.selectedTeamGetterSetter = function (newInputValue) {
        if (arguments.length) {
          _selectTeamInputValue = newInputValue || '';
        }
        return _selectTeamInputValue;
    };

    self.createNewTeam = function () {
        teamService.createTeam(self.newTeam)
            .success(function (data) {
                self.selectedTeam = data;
                self.isCreateNewTeamVisible = false;
                self.isSaveAsTeamVisible = false;
                self.allTeams.push(data);
                self.changeTeamColors();
                notify({message: 'Team: ' + data.teamName + '\n created successful'});
            })
            .error(function (data) {
                notify({message: 'Error: ' + data});
                console.log("Error: " + data);
            });
    };

    self.addPlayer = function (team) {
        var count = team.players.length;
        self.selectedTeam.players.push({
            playerName: 'Player' + (count + 1),
            playerNumber: count + 1
        });
        self.selectedTeam.playersCount++;
    };

    self.removePlayer = function (team) {
        self.selectedTeam.players.splice(team.players.length - 1, 1);
        self.selectedTeam.playersCount--;
    };

    self.removePlayerByIndex = function (index){
        self.selectedTeam.players.splice(index, 1);
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
                notify({message: 'Team deleted successful'});
            })
            .error(function (data) {
                notify({message: 'Error: ' + data});
                console.log('Error: ' + data);
            });
    };

    self.updateTeam = function () {
        teamService.updateTeam(self.selectedTeam)
            .success(function (data) {
                //self.selectedTeam = data;
                notify({message: 'Team: ' + data.teamName + '\n Updated successful', classes: 'noty', position: 'center'});
                self.changeTeamColors();
                self.isEditTeamVisible = false;
                $location.search('id', self.selectedTeam._id);
            })
            .error(function (data) {
                notify({message: 'Error: ' + data});
                console.log('Error: ' + data);
            });
    };

    self.getTeamById = function (id) {
        teamService.getTeamById(id)
            .success(function (data) {
                self.selectedTeam = data;
                notify({message: 'Team: ' + data.teamName + '\n loaded successful', classes: 'noty', position: 'center'});
                self.changeTeamColors();
            })
            .error(function (data) {
                notify({message: 'Error: ' + data});
                console.log('Error: ' + data);
            });
    };

    self.getUrlParams = function () {
        var id = $location.search().id ? $location.search().id : "";
        if (id) {
            self.getTeamById(id);
        }
    }();

    self.setSelectedTeam = function (team) {
        self.selectedTeam = team;
        //self.changeTeamColors();
    };

    self.searchTextChange = function (text) {
        console.log(text);
    },

    //Create New Team
    self.onCreateNewTeamClick = function () {
        self.isCreateNewTeamVisible = true;
        self.newTeam = JSON.parse(JSON.stringify(self.allTeams[0]));
        self.newTeam.teamName = 'New Team';
    };

    self.onCreateNewTeamCancelClick = function () {
        self.isCreateNewTeamVisible = false;
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



    //$scope.demoMessageTemplate = function(){
    //
    //    var messageTemplate = '<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong>Oh snap!</strong> <a href="#" class="alert-link">Change a few things up</a> and try submitting again.</div>';
    //
    //    notify({
    //        messageTemplate: messageTemplate,
    //        classes: 'alert-danger',
    //        scope:$scope,
    //        //\templateUrl: $scope.template,
    //        position: 'left'
    //    });
    //
    //};
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

    $scope.dragControlListeners = {
        accept: function (sourceItemHandleScope, destSortableScope) {
            console.log("accept");
            return boolean;
        },
        //override to determine drag is allowed or not. default is true.
        itemMoved: function (event) {
            console.log("move");
        },
        //Do what you want},
        orderChanged: function (event) {
            console.log("oredr");
        },
        //Do what you want},
        containment: '#board'//optional param.
    };

    //$scope.sortableOptions = {
    //
    //}
    $scope.dropControlListeners = {
        accept: function (sourceItemHandleScope, destSortableScope) {
            console.log("accept");
            return boolean;
        },
        //override to determine drag is allowed or not. default is true.
        itemMoved: function (event) {
            console.log("move");
        },
        //Do what you want},
        orderChanged: function (event) {
            console.log("oredr");
        },
        //Do what you want},
        containment: '#board'//optional param.
    };

}]);
