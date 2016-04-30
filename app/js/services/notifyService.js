'use strict';

app.factory('notifyService',
    function () {
        function showSuccess(msg) {
            noty({
                text: msg,
                type: 'success',
                layout: 'topCenter',
                timeout: 2000,
                closeWith: ['click'],
                theme:'relax'
            });
        }
        function showError(msg, serverError) {
            var errors = [];
            if (serverError && serverError.error_description) {
                errors.push(serverError.error_description);
            }
            if (serverError && serverError.modelState) {
                var modelStateErrors = serverError.modelState;
                for (var propertyName in modelStateErrors) {
                    var errorMessages = modelStateErrors[propertyName];
                    var trimmedName = propertyName.substr(propertyName.indexOf('.') + 1);
                    for (var i = 0; i < errorMessages.length; i++) {
                        var currentError = errorMessages[i];
                        errors.push(trimmedName + ' - ' + currentError);
                    }
                }
            }
            if (errors.length > 0) {
                msg = msg + ":<br>" + errors.join("<br>");
            }
            noty({
                text: msg,
                type: 'error',
                timeout: 2000,
                closeWith: ['click'],
                theme:'relax'
            });
        }
        
        return {
            showSuccess: showSuccess,
            showError: showError
        }
    }
);