"use strict";

app.controller('MakeAdminController', ['$scope', '$timeout', '$location', 'userService', 'authenticationService', 'notifyService',
    function ($scope, $timeout, $location, userService, authenticationService, notifyService) {
        var isLogged = authenticationService.getUserToken();
        if (!isLogged) {
            notifyService.showError('Please login first!');
            $location.path('/');
        }

        if(localStorage['isAdmin'] != 'true') {
            notifyService.showError('You are not an admin!');
            $location.path('/');
        }

        userService.getAllUsers().then(function (success) {
            $scope.allUsernames = success.data;
        });
        $scope.selectedUserId = function (id) {
            userService.makeAdmin(id).then(function () {
                notifyService.showSuccess('This user is now an admin!');
            }, function (error) {
                console.log(error.data);
                notifyService.showError('', error.data);
            })
        }
    }]);