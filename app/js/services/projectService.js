"use strict";
app.factory('projectService', ['$http', 'baseServiceUrl', 'authenticationService',
    function ($http, baseServiceUrl, authenticationService) {

        function getAllProject() {
            var header = authenticationService.getUserHeaderFromLocalStorage();
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'projects',
                headers: header
            };
            return $http(request);
        }

        function getProjectByLeadId(id) {
            var header = authenticationService.getUserHeaderFromLocalStorage();
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'projects?filter=Lead.Id="' + id + '"&pageSize=4&pageNumber=1',
                headers: header
            };
            return $http(request);
        }

        function getProjectById(id) {
            var header = authenticationService.getUserHeaderFromLocalStorage();
            var request = {
                method: 'GET',
                url: baseServiceUrl + 'projects/' + id,
                headers: header
            };
            return $http(request);
        }

        function addProject(projectData) {
            var header = authenticationService.getUserHeaderFromLocalStorage();
            var request = {
                method: 'POST',
                url: baseServiceUrl + 'projects',
                data: projectData,
                headers: header
            };
            return $http(request);
        }

        function editProject(projectData, id) {
            var header = authenticationService.getUserHeaderFromLocalStorage();
            var request = {
                method: 'PUT',
                url: baseServiceUrl + 'projects/' + id,
                data: projectData,
                headers: header
            };
            return $http(request);
        }


        return {
            getAllProject: getAllProject,
            getProjectByLeadId: getProjectByLeadId,
            getProjectById: getProjectById,
            addProject: addProject,
            editProject: editProject
        }
    }]);