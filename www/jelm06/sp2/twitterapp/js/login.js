var App = App || {};
var userLoggedIn;
var isUserLogedIn = false;

/**
 * Handles user's login to twitter to get OAuth token for API requests.
 */
var login = function () {
    loaderOnOff(true);
    console.log('searching for ' + hashtagValue);
    OAuth.initialize('RqDiAoEGjM7O8Eno938FoMuHTmk');
    OAuth.popup('twitter')
        .done(function (result) {
            loaderOnOff(false);
            isUserLogedIn = true;
            userLoggedIn = result;
            $('#btn-login').unbind('click').html('LOGOUT').click(logout);
            $('.before-login').css('display', 'none');
            $('.after-login').css({'display': 'block', 'visibility': 'visible'});
            $('.action-buttons').css('display', 'inline-block');
            $(':header').css({'background-color': 'white', 'color': '#00acee'});
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
    $('.before-login').css('display', 'block');
    $('.after-login').css({'display': 'none', 'visibility': 'hidden'});
};