/**
 * Created by darin on 6/17/2015.
 */
'use strict';
app.directive('myDraggable', ['$document', function ($document) {
    return {
        controller: 'MainController as ctrl',
        link: function (scope, element, attr) {
            var xPer = scope.player.left ? scope.player.left : 0,
                yPer = scope.player.top ? scope.player.top : 0,
                fieldWidth = element.parent()[0].offsetWidth,
                fieldHeight = element.parent()[0].offsetHeight,
                startX = 0,
                startY = 0,
                x = parseInt((fieldWidth * xPer) / 100),
                y = parseInt((fieldHeight * yPer) / 100);

            element.css({
                top: yPer + '%',
                left: xPer + '%'
            });

            element.on('mousedown', function (event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                xPer = parseInt((x * 100) / fieldWidth);
                yPer = parseInt((y * 100) / fieldHeight);

                element.css({
                    top: yPer + '%',
                    left: xPer + '%'
                });
            }

            function mouseup() {
                x = x < 0 ? 0 : x;
                x = x > fieldWidth ? fieldWidth : x;
                y = y < 0 ? 0 : y;
                y = y > fieldHeight ? fieldHeight : y;

                //In %
                xPer = parseInt((x * 100) / fieldWidth);
                yPer = parseInt((y * 100) / fieldHeight);

                element.css({
                    top: yPer + '%',
                    left: xPer + '%'
                });


                scope.player.top = yPer;
                scope.player.left = xPer;
                //scope.player.playerNumber = xPer;
                scope.$apply();

                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        }
    };
}]);