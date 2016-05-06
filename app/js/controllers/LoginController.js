"use strict";

app.controller('LoginController', ['$scope', '$rootScope', '$location', 'userService', 'authenticationService', 'notifyService',
    function ($scope, $rootScope, $location, userService, authenticationService, notifyService) {
        if(localStorage['user'] != undefined) {
            $location.path('/')
        }
        else {
            $scope.login = function (user) {
                userService.login(user)
                    .then(function (success) {
                        authenticationService.saveUserToken(angular.toJson(success));
                        userService.userInfo();
                        notifyService.showSuccess('Successful login! ' + 'Welcome ' + success.data.userName + ' !');
                        $location.path('/')
                    }, function (error) {
                        console.log(error);
                        notifyService.showError('Login failed:', error.data)
                    })
            }
        }
    }]);