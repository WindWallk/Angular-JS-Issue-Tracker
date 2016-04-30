"use strict";

app.controller('AppController',
    ['$scope', '$location', 'userService', 'authenticationService',
        function ($scope, $location, userService, authenticationService) {
            $scope.userService = userService;
            $scope.logout = function () {
                userService.logout().then(function () {
                    authenticationService.clearUserStorage();
                    $location.path('/');
                })
            }
    }]);