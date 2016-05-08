'use strict';

app.factory('userService', 
    ['$http', 'baseServiceUrl', 'authenticationService', '$location',
        function ($http, baseServiceUrl, authenticationService, $location) {

            function login(user) {
                user.grant_type = 'password';
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'api/Token',
                    data: 'grant_type=' + user.grant_type +
                    '&username=' + user.email +
                    '&password=' + user.password,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                };

                return $http(request);
            }

            function register(user) {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'api/account/register',
                    data: user
                };

                return $http(request);
            }

            function logout() {
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'api/Account/logout',
                    headers: authenticationService.getUserHeaderFromLocalStorage()
                };

                authenticationService.clearUserStorage();

                return $http(request);
            }

            function getAllUsers() {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'users',
                    headers: authenticationService.getUserHeaderFromLocalStorage()
                };

                return $http(request);
            }

            function getAllUsersByFilter() {
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'users?filter=Username.Contains("oracle")',
                    headers: authenticationService.getUserHeaderFromLocalStorage()
                };

                return $http(request);
            }

            function getCurrentUser() {
                var userToken = authenticationService.getUserToken();
                if (userToken) {
                    return userToken;
                }
            }

            function makeAdmin(userId) {
                var headerToken = authenticationService.getUserHeaderFromLocalStorage();
                var request = {
                    method: 'PUT',
                    url: baseServiceUrl + 'users/makeadmin',
                    data: {'UserId': userId},
                    headers: headerToken

                };

                return $http(request);
            }

            function userInfo() {
                var headerToken = authenticationService.getUserHeaderFromLocalStorage();
                var request = {
                    method: 'GET',
                    url: baseServiceUrl + 'users/me',
                    headers: headerToken
                };

                var promise = $http(request);
                promise.then(function (admin) {
                    var isAdmin = admin.data.isAdmin;
                    localStorage['isAdmin'] = isAdmin;
                    localStorage['isNormal'] = !isAdmin && !isProjectLead();
                });
                return promise;
            }

            function changePassword(changePassword) {
                var headerToken = authenticationService.getUserHeaderFromLocalStorage();
                var request = {
                    method: 'POST',
                    url: baseServiceUrl + 'api/account/changepassword',
                    data: changePassword,
                    headers: headerToken
                };

                return $http(request);
            }

            function isAnonymous() {
                return localStorage['user'] == undefined;
            }

            function isLoggedIn() {
                return localStorage['user'] != undefined;
            }

            function isProjectLead() {
                var currentUser = getCurrentUser();
                var isLead = false;
                if (currentUser != undefined && currentUser.userName == 'oracle@gmail.bg') {
                    isLead = true;
                }
                return isLead;
            }

            function isAdminUser() {
                return localStorage['isAdmin'] == 'true';
            }

            function isNormalUser() {
                return localStorage['isNormal'] == 'true';
            }

            function getAuthHeaders() {
                authenticationService.getUserHeaderFromLocalStorage();
            }

            return {
                login: login,
                register: register,
                logout: logout,
                isAnonymous: isAnonymous,
                isLoggedIn: isLoggedIn,
                isAdminUser: isAdminUser,
                getAuthHeaders: getAuthHeaders,
                makeAdmin: makeAdmin,
                changePassword: changePassword,
                isProjectLead: isProjectLead,
                getAllUsers: getAllUsers,
                getAllUsersByFilter: getAllUsersByFilter,
                userInfo: userInfo,
                isNormalUser: isNormalUser
            }
        }]);