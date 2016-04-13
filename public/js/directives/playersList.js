/**
 * Created by darin on 5/9/2015.
 */
app.directive('playersList',function(){
    return{
        restrict: 'E',
        scope: {
            team: '=team'
        },
        controller: 'MainController as ctrl',
        templateUrl: '../../templates/players-list.html',
        replace: true
    };
});
