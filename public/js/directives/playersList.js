/**
 * Created by darin on 5/9/2015.
 */
app.directive('playersList',function(){
    return{
        restrict: 'E',
        templateUrl: '../../templates/players-list.html',
        replace: true
    }
});