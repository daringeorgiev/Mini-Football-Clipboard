app.directive('teamDetails',function(){
    return{
        restrict: 'E',
        scope: {
            team: '=team'
        },
        templateUrl: '../../templates/team-details.html',
        replace: true
    };
});
