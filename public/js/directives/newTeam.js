/**
 * Created by darin on 6/14/2015.
 */
app.directive('newTeam',function(){
    return{
        restrict: 'E',
        templateUrl: '../../templates/new-team.html',
        replace: true
    }
});
