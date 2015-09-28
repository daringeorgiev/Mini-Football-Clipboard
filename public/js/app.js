'use strict';
var app = angular.module('app', ['cgNotify', 'ui.sortable', 'ngRoute', 'ngMaterial'])

.config(['$routeProvider', '$locationProvider', '$mdThemingProvider',
    function($routeProvider, $locationProvider, $mdThemingProvider) {
        $routeProvider.
            when('/', {
                reloadOnSearch:false
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('blue');
    }]);