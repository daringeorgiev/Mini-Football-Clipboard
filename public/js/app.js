'use strict';
var app = angular.module('app', ['cgNotify', 'ui.sortable', 'ngRoute'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/team', {
                reloadOnSearch:false
            });
    }]);