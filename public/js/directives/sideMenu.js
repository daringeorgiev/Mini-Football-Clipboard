/**
 * Created by darin on 5/16/2015.
 */
'use strict';
app.directive('sideMenu',function(){
    return{
        restrict: 'E',
        templateUrl: '../../templates/side-menu.html',
        replace: true
    }
});