var App = App || {};
var userLoggedIn;
var isUserLogedIn = false;

/**
 * Handles user's login to twitter to get OAuth token for API requests.
 */
var login = function () {
    console.log('searching for ' + hashtagValue);
    OAuth.initialize('RqDiAoEGjM7O8Eno938FoMuHTmk');
    OAuth.popup('twitter')
        .done(function(result) {
            isUserLogedIn = true;
            userLoggedIn = result;
            $('#btn-login').unbind('click').html('LOGOUT').click(logout);

        })
        .fail(function (err) {
            alert("Unknown error: login failed.");
            console.log(err);
        });
};

/**
 * Logs user out.
 */
var logout = function () {
    userLoggedIn = '';
    isUserLogedIn = false;
    $('#btn-login').html('LOGIN').click(login);
};