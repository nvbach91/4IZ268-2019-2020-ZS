$(document).ready(function(){   
    $("#login").click(function(){
       facebookLogin();    
    });

    $("#logout").click(function(){
      $("#logout").hide();
      $("#login").show();
      $("#status").empty();
      facebookLogout();
    });
  
    function facebookLogin()
    {
      FB.getLoginStatus(function(response) {
          console.log(response);
          statusChangeCallback(response);
      });
    }
   
    function statusChangeCallback(response)
    {
        console.log(response);
        if(response.status === "connected")
        {
           $("#login").hide();
           $("#logout").show(); 
           fetchUserProfile();
        }
        else{
            facebookLoginByDialog();
        }
    }
    function fetchUserProfile()
    {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me?fields=id,name,email,gender,birthday,location', function(response) {
        console.log(response);
        console.log('Successful login for: ' + response.name);
        var profile = `<h1>Welcome ${response.name}<h1>
         <h2>Your email is ${response.email}</h2>
         <h3>Your Birthday is ${response.birthday}</h3>
         <h3>Your Location is ${response.location}</h3>`;
        $("#status").append(profile);
      });
    }
   
    function facebookLoginByDialog()
    {
      FB.login(function(response) {
         
          statusChangeCallback(response);
         
      }, {scope: 'public_profile,email'});
    }
    
    function facebookLogout()
    {
      FB.logout(function(response) {
          statusChangeCallback(response);
      });
    }
  
   });