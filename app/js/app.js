'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('issueTrackingSystemApp', [
  'ngRoute',
  'angular.filter'
]);

app.constant('baseServiceUrl', 'http://softuni-issue-tracker.azurewebsites.net/');

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);
