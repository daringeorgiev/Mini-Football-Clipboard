/**
 * Created by darin on 25/7/2015.
 */
app.directive('registerForm', function(){
    return{
        restrict: 'E',
        templateUrl: '../../templates/register-form.html',
        controller: 'UserController as userCtrl',
        replace: true
    }
});
