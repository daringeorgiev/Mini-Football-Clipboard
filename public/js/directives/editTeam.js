/**
 * Created by darin on 4/9/2015.
 */
app.directive('editTeam',function(){
    return{
        restrict: 'E',
        templateUrl: '../../templates/edit-team.html',
        replace: true
    }
});
