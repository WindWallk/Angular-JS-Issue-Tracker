"use strict";
app.controller('AddProjectController', ['$scope', '$location', 'userService', 'projectService', 'authenticationService', 'notifyService',
    function ($scope, $location, userService, projectService, authenticationService, notifyService) {
        var isLogged = authenticationService.getUserToken();
        if (!isLogged) {
            notifyService.showError('Please login first.');
            $location.path('/');
        }

        userService.getAllUsers().then(function (users) {
            $scope.allUsernames = users.data;
        });

        $scope.addProject = function (projectData) {
            var data = {
                Name: projectData.name,
                Description: projectData.description,
                ProjectKey: projectData.key,
                labels: [],
                priorities: [],
                LeadId: projectData.userId
            };
            var label = projectData.labels.split(', '),
                priorities = projectData.priorities.split(', ');
            for (var i = 0; i < label.length; i++) {
                data.labels.push({Name: label[i]});
            }

            for (i = 0; i < priorities.length; i++) {
                data.priorities.push({Name: priorities[i]});

            }
            projectService.addProject(data).then(function (success) {
                notifyService.showSuccess(success.statusText + 'created: ' + success.Name + 'project!')
            }, function (error) {
                notifyService.showError('', error.data);
            })
        }
    }]);