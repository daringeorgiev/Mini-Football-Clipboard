/**
 * Created by darin on 5/16/2015.
 */
'use strict';
app.directive('footballField',function(){
    return{
        restrict: 'E',
        templateUrl: '../../templates/football-field.html',
        replace: true,
        //compile: function (scope, element, attr) {
        //    $('.draggableArea').width($('.imgField').width() - $('.player').width());
        //    $('.draggableArea').css({left: $('.imgField').position().left});
        //    $(window).on('resize', function () {
        //        $('.draggableArea').width($('.imgField').width() - $('.player').width());
        //        $('.draggableArea').css({left: $('.imgField').position().left});
        //    });
        //}
    }
});