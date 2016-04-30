'use strict';

app.factory('authenticationService',
    function () {
        function saveUserToken(data) {
            localStorage.setItem('user', data);
        }
        
        function getUserToken() {
            var token = JSON.parse(localStorage.getItem('user'));
            if(!token) {
                return false;
            }

            return token.data;
        }
        
        function getUserHeaderFromLocalStorage() {
            var headers = {};

            var userToken = getUserToken();
            if(userToken) {
                headers.Authorization = 'Bearer ' + userToken.access_token;
            }

            return headers
        }

        function clearUserStorage() {
            localStorage.clear();
        }

        return {
            saveUserToken: saveUserToken,
            getUserToken: getUserToken,
            getUserHeaderFromLocalStorage: getUserHeaderFromLocalStorage,
            clearUserStorage: clearUserStorage
        }
    });