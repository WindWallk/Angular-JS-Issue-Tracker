'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('issueTrackingSystemApp', [
  'ngRoute',
  'angular.filter'
]);

app.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net/');

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'templates/home.html',
      controller: 'HomeController'
    });
  
    $routeProvider.otherwise({redirectTo: '/'});
}]);
