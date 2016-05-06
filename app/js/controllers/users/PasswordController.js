"use strict";

app.controller('ProfilePasswordController', ['$scope', '$rootScope', '$location', 'userService', 'authenticationService', 'notifyService',
    function ($scope, $rootScope, $location, userService, authenticationService, notifyService) {
        var isLogged = authenticationService.getUserToken();
        if(!isLogged){
            notifyService.showError('Please login first.');
            $location.path('/');
        }
        $scope.changePassword = function (passwordChange) {
            if (passwordChange.newPassword != passwordChange.confirmPassword) {
                notifyService.showError('The new password and confirm password does not match!');
            } else {
                userService.changePassword(passwordChange).then(function (success) {
                    notifyService.showSuccess('You successfully changed your password!');
                    userService.logout().then(function (success) {
                        authenticationService.clearUserStorage();
                        $location.path('/');
                    });

                }, function(error){
                    console.log(error);
                    notifyService.showError('The old password does not match!', error.data);
                })
            }
        }
    }]);