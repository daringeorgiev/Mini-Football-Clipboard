'use strict';
var app = angular.module('app', ['cgNotify', 'ui.sortable', 'ngRoute', 'ngMaterial'])

.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/', {
                reloadOnSearch:false
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);