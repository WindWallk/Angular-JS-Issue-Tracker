'use strict'

app.controller('ProjectsController', ['$scope', '$location', 'projectService', 'authenticationService', 'issueService', 'userService', 'notifyService',
    function ($scope, $location, projectService, authenticationService,issueService, userService, notifyService) {
        $scope.readyDownload = false;
        $scope.listOfProjectsReady = false;
        $scope.projects = [];
        $scope.authenticationService = userService;
        var result = [];
        var isLogged = authenticationService.getUserToken();
        if (!isLogged) {
            notifyService.showError('Please login first!');
            $location.path('/');
        }

        userService.userInfo().then(function (success) {
            projectService.getProjectByLeadId(success.data.Id).then(function (success) {
                $scope.projects = success.data.Projects;
                console.log(success);
            })
        });

        $scope.listOfProjectsReady = true;
        $scope.selectedName = function (name) {
            if (name != undefined) {
                $scope.projectName = name;
                $scope.readyDownload = true;
                projectService.getProjectById(name).then(function (success) {
                    console.log(success);
                });
                
                $scope.issues = result;
            }
        };

        $scope.addButton = function (id) {
            $location.path('/projects/' + id + '/add-issue');
        }

    }]);
