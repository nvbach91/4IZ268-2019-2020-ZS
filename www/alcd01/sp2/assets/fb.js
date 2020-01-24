function statusChangeCallback(response){
    console.log("Callback proces");
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    if (response.status === 'connected') {
        document.getElementById("status").innerHTML = "connected";
        FB.api('/me', function (response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById("status").innerHTML = "Thanks for login: " + response.name;
            var fbName = response.name;
            localStorage.setItem("fbName", fbName);
        });
        //since we're connected, we can now make API calls for the user
        if (loggedInCallback) loggedInCallback();
    }
    else {
        console.log('not connected');
        document.getElementById("status").innerHTML = "Please log into this app";

        FB.login(function(response){
            console.log(response)
        },{
            scope: 'public_profile, email',
            return_scopes: true
        });
        //The person is not logged into your app or we are unable to tell.
        //Since the user isn't connected, you could show a Facebook login button or
        //display a notice to the user on your site.
    }
}
$("#login-button").click(function() {
FB.login(function (response) {
    console.log("Login completed");
    console.log(response);

    FB.api('/me?fields=name', function (response) {
        console.log(response)
        var fbName = response.name;
        localStorage.setItem("fbName", fbName);
    });
},{
    scope: 'public_profile, email',
    return_scopes: true
});
fbLogin();
});

$("#logout-button").click(function () {
    localStorage.removeItem("fbName");
    facebookLogout();
    console.log("Successfully logged out");
    fbLogout();
  });
  function facebookLogout() {
    FB.logout(function (response) {
      statusChangeCallback(response);
    });
  }
/**Login to fb */

    /*$("#login-button").click(function () {
      facebookLogin();
    });*/
    function facebookLogin() {
        FB.getLoginStatus(function (response) {
          console.log(response);
          statusChangeCallback(response);
        });
      }

      $("#logout").click(function () {
        facebookLogout();
      });
    
      function statusChangeCallback1(response) {
        console.log(response);
        if (response.status === "connected") {
          $("#feed").show();
          fetchUserProfile();
        }
        else {
          facebookLoginByDialog();
        }
    }
    
/**connecting to my api */

window.fbAsyncInit = function() {
    FB.init({
        appId: '481993722443745',
        xfbml: true,
        version: 'v5.0'
    });
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
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

/**facebook post to group */
$("#post-button").click(function() {

      FB.api('/[584087199100510]/feed', 'post', {message: 'Hello world!'});
  function callback(response) {
    if (!response) {
        console.log('User did not share the page.');
    } else {
        console.log('User shared the page!');
    }
};
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

/**Garhering name from fb login */
function fetchUserProfile() {
    console.log('Welcome! Connecting to fb...');
    FB.api('/me?fields=id,name', function (response) {
      console.log(response);
      console.log('Successful login for: ' + response.name);
      var profile = `<h1>Welcome ${response.name}<h1>`;
      $("#status").append(profile);
    });
  };
function fbLogin(){
    console.log("Logged in using your name");
    return $("#inputName").hide();
}
function fbLogout() {
    console.log("Cannot log in using your name");
    return $("#inputName").show()
}


