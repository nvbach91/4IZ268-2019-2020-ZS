/**connecting to my api */

window.fbAsyncInit = function() {
    FB.init({
        appId: '481993722443745',
        xfbml: true,
        version: 'v5.0'
    });
    FB.AppEvents.logPageView();
};
/**defines buttons functions: share, like, post */
document.getElementById('share-button').addEventListener('click', function() {
    FB.ui({
        method: 'share',
        href: window.location.href
    }, function(response) {
        if (!response) {
            console.log('User did not share the page.');
        } else {
            console.log('User shared the page!');
        }
    });
});

document.getElementById('like-button').addEventListener('click', function() {
    FB.ui({
        method: 'share_open_graph',
        action_type: 'og.likes',
        action_properties: JSON.stringify({
            object: window.location.href
        })
    }, function(response) {
        if (!response) {
            console.log('User did not share the page.');
            return false;
        } else {
            console.log('User shared the page!');
        }
    });
});

document.getElementById('send-button').addEventListener('click', function() {
    FB.ui({
        method: 'send',
        link: window.location.href
    }, function(response) {
        if (!response) {
            console.log('User did not share the page.');
        } else {
            console.log('User shared the page!');
        }
    });
});

/*$(document).ready(function() {
    if (response === false) {
        $("#before").before('<div class="noShare>Action not properly completed!<br>Please try again later.</<div>');
    }

});*/

//Load the JavaScript SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));