/**
 * Created by darin on 4/9/2015.
 */
'use strict';
app.directive('editTeam',function(){
    return{
        restrict: 'E',
        templateUrl: '../../templates/edit-team.html',
        replace: true
    }
});