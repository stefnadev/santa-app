// Handle status changes
function handleStatusChange(response) {
    if (response.authResponse) {
        alert(JSON.stringify(response));
        updateUserInfo(response);
    } else {
        alert(JSON.stringify(response));
    }
}

function promptLogin() {
    FB.login(function(response) {
        alert(JSON.stringify(response));
    }, {scope: 'email'});
}

function updateUserInfo(response) {
    FB.api('/me',
        {fields: "name,first_name,picture"},
        function (response) {
            console.log(response);
            alert(JSON.stringify(response));
        });
}

function handleGenericError(e) {
    alert(JSON.stringify(response));
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
                alert(JSON.stringify(response));
            }
        }, {scope: 'publish_actions'}
    );
}