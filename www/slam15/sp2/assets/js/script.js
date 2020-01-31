$(document).ready(function () {
  $("#login").click(function () {
    facebookLogin();
  });

  $("#logout").click(function () {
    $("#logout").hide();
    $("#login").show();
    $("#status").empty();
    $("#share-button").hide();
    $("#fb").hide();
    $("#selectNumber").hide();
    $("#myText").hide();
    facebookLogout();
  });

  function facebookLogin() {
    FB.getLoginStatus(function (response) {
      console.log(response);
      statusChangeCallback(response);
    });
  }

  function statusChangeCallback(response) {
    console.log(response);
    if (response.status === "connected") {
      $("#login").hide();
      $("#logout").show();
      $("#status").show();
      $("#share-button").show();
      $("#fb").show();
      $("#selectNumber").show();
      $("#myTßext").show();
      fetchUserProfile();
    }
    else {
      facebookLoginByDialog();
    }
    
    /* $("#fb").click(function() {
      FB.api(
            "/me?fields=groups",
            function (response) {
              if (response && !response.error) {
                console.log(response);
              } else {
              console.log("erorr")
          }
            });
      });  */
    
     /* $("#fb").click(function() {
        FB.api(
              "/2846603562045100/feed",
              function (response) {
                if (response && !response.error) {
                  console.log(response);
                } else {
                console.log("erorr")
            }
              });
        }); */

       /* $("#fb").click(function() {
          FB.api(
                "/me/groups",
                function (response) {
                  if (response && !response.error) {
                      var select = document.getElementById("selectNumber");
              var response = ["API1", "API2", "API3"];
              for(var i = 0; i < options.length; i++) {
                  var opt = options[i];
                  var el = document.createElement("option");
                  el.textContent = opt;
                  el.value = opt;
                  select.appendChild(el);
              }
                  } else {
                  console.log("erorr")
              }
                });
          }); */
          
          var select = document.getElementById("selectNumber"); 
var options = ["API1", "API2", "API3"]; 

for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
 }
  console.log(options);

  function postOrFinish() {
    if (options.length > 0) {
        var groupId = options.pop();
        var message = document.getElementById("myText").value;
        FB.api(
            "/" + groupId + "/feed",
            "POST", {
                "message": message,
            },
            function(response) {
                if (response.error) {
                    console.log(response.error);
                }
            });
          };
    }
      

      

    $("#share-button").click(function () {
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
}


  function fetchUserProfile() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=id,name,email', function (response) {
      console.log(response);
      console.log('Successful login for: ' + response.name);
      var profile = `<h1>Welcome ${response.name}<h1>
         <h2>Your email is ${response.email}</h2>`;
      $("#status").append(profile);
    });
  }
  function facebookLoginByDialog() {
    FB.login(function (response) {

      statusChangeCallback(response);

    }, { scope: 'public_profile,email' });
  }

  function facebookLogout() {
    FB.logout(function (response) {
      statusChangeCallback(response);
    });
  }

});