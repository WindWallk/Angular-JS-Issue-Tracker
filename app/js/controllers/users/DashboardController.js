"use strict";

app.controller('DashboardController',
    ['$scope', '$timeout', 'userService', 'issueService',
        function ($scope, $timeout, userService, issueService) {
            $scope.readyDownload = false;
            var result;
            issueService.getMyIssues().then(function (data) {
                result = data.data.Issues;
                console.log(result);
            });

            $timeout(function () {
                $scope.issues = result;
                $scope.pageTitle = 'Dashboard';
                $scope.readyDownload = true;
            }, 3000)

        }]);