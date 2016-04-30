"use strict";

app.controller('AppController',
    ['$scope', '$location', 'userService', 'authenticationService','notifyService',
        function ($scope, $location, userService, authenticationService, notifyService) {
            $scope.userService = userService;
            $scope.logout = function () {
                $scope.logout = function () {
                    userService.logout().then(function () {
                        authenticationService.clearUserStorage();
                        notifyService.showSuccess('You successfully logged out');
                        $location.path('/');
                    })
                }
            }
    }]);