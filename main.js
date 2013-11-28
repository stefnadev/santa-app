// Handle status changes
function handleStatusChange(response) {
    if (response.authResponse) {
        alert(response);
        window.location.hash = '#menu';
        updateUserInfo(response);
    } else {
        alert(response);
    }
}

function promptLogin() {
    FB.login(null, {scope: 'email'});
}

function updateUserInfo(response) {
    FB.api('/me',
        {fields: "name,first_name,picture"},
        function (response) {
            console.log(response);
            alert(response);
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
                publishOGAction(response);
            }
        }, {scope: 'publish_actions'}
    );
}