/**
 * Created by darin on 5/16/2015.
 */
'use strict';
app.directive('appHeader',function(){
    return{
        restrict: 'E',
        templateUrl: '../../templates/app-header.html',
        replace: true
    }
});