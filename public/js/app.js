
var app = angular.module('app', ['cgNotify', 'ui.sortable', 'ngRoute'])

.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        'use strict';
        $routeProvider
            .when('/', {
                reloadOnSearch:false
            })
            .when('/register', {
                templateUrl: 'templates/register-form.html',
            })
            .when('/edit-team', {
                templateUrl: 'templates/edit-team.html',
            })
            .when('/create-new-team', {
                templateUrl: 'templates/new-team.html',
            })
            .when('/save-as-team', {
                templateUrl: 'templates/edit-team.html',
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);
