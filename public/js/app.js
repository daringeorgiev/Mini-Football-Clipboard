
var app = angular.module('app', ['cgNotify', 'ui.sortable', 'ngRoute'])

.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        'use strict';
        $routeProvider.
            when('/', {
                reloadOnSearch:false
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);
