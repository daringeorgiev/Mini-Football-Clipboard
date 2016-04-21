
var app = angular.module('app', ['cgNotify', 'ui.sortable', 'ngRoute', 'ngAnimate', 'ui.bootstrap'])

.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        'use strict';
        $routeProvider
            .when('/', {
                reloadOnSearch:false
            })
            .when('/register', {
                templateUrl: 'templates/register-form.html',
                controller: 'UserController as userCtrl',
                reloadOnSearch: false
            })
            .when('/edit-team', {
                templateUrl: 'templates/edit-team.html',
                reloadOnSearch: false
            })
            .when('/create-new-team', {
                templateUrl: 'templates/new-team.html',
                reloadOnSearch: false
            })
            .when('/save-as-team', {
                templateUrl: 'templates/edit-team.html',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);
