/**
 * Created by darin on 5/16/2015.
 */
app.directive('appHeader',function(){
    return{
        restrict: 'E',
        templateUrl: '../../templates/app-header.html',
        controller: 'UserController as userCtrl',
        replace: true
    }
});
