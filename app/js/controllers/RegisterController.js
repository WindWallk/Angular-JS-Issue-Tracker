"use strict";

app.controller('RegisterController', ['$scope', '$rootScope', '$location', 'userService', 'authenticationService', 'notifyService',
    function ($scope, $rootScope, $location, userService, authenticationService, notifyService) {
        $scope.register = function (user) {
            if(user.password != user.confirmPassword) {
                notifyService.showError('The password and confirm password does not mach!');
            }
            else {
                userService.register(user).then(function (success) {
                    userService.login(success.config.data)
                        .then(function (success) {
                            authenticationService.saveUserToken(angular.toJson(success));
                            var registerMessage = 'You registered successfully.';
                            var welcomeMessage = 'Welcome ' + success.data.userName +'!';
                            notifyService.showSuccess(registerMessage + "</br>" + welcomeMessage)
                            $location.path('/');
                        }, function (error) {
                            console.log(error);
                            notifyService.showError('Register failed:', error.data)
                        })
                });
            }
        }
    }]);