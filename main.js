// Handle status changes
function handleStatusChange(response) {
    if (response.authResponse) {
        $('#login').addClass('hide');
        updateUserInfo(response);
    }
    else {
        $('#login').removeClass('hide');
    }
}

function promptLogin() {
    FB.login(function(response) {
    }, {scope: 'email'});
}

function updateUserInfo(response) {
    FB.api('/me',
        {fields: "name,first_name,picture"},
        function (response) {
            $('#info').html('Hæ, ' + response.name).removeClass('hide');
        });
}

function handleGenericError(e) {
    console.log("Error ..." + JSON.stringify(e));
}

function reauthorizeForPublishPermissions() {
    console.log("[reauthorizeForPublishPermissions] asking for additional permissions.");
    // If successful, try publishing action again
    // else, just show error
    FB.login(
        function (response) {
            if (!response || response.error) {
                handleGenericError(response.error);
            } else {
            }
        }, {scope: 'publish_actions'}
    );
}

$(function() {
    $('#login').click(function() {
        promptLogin();
    });
});