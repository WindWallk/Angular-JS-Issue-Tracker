"use strict";
app.controller('AdminPanelController', ['$scope', '$timeout', '$location','issueService', 'authenticationService', 'notifyService',
    function ($scope, $timeout, $location,issueService, authenticationService, notifyService) {
        var isLogged = authenticationService.getUserToken();
        if(!isLogged){
            notifyService.showError('Please login first!');
            $location.path('/');
        }
        
        if(localStorage['isAdmin'] != true) {
            notifyService.showError('You are not an admin!');
            $location.path('/');
        }
    }]);