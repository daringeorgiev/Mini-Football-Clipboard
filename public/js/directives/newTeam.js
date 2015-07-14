/**
 * Created by darin on 6/14/2015.
 */
'use strict';
app.directive('newTeam',function(){
    return{
        restrict: 'E',
        templateUrl: '../../templates/new-team.html',
        controller: 'MainController as ctrl',
        replace: true
    }
});