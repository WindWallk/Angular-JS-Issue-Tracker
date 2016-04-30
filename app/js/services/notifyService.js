'use strict';

app.factory('notifyService',
    function () {
        function showSuccess(msg) {
            noty({
                text: msg,
                type: 'success',
                layout: 'topCenter',
                timeout: 1000}
            );
        }
        function showError(message, serverError) {
            var errors = [];
            if (serverError && serverError.message) {
                errors.push(serverError.message);
            }
            if (serverError && serverError.error_description) {
                var modelStateErrors = serverError.error_description;
                errors.push(modelStateErrors);
            }
            if (errors.length > 0) {
                message = message + "<br>" + errors.join("<br>");
            }
            noty({
                text: message,
                type: 'error',
                layout: 'topCenter',
                timeout: 5000}
            );
        }
        return {
            showSuccess: showSuccess,
            showError: showError
        }
    }
);