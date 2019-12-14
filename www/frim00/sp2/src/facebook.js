window.fbAsyncInit = () => {
    //FB JavaScript SDK configuration and setup
    FB.init({
        appId: '562251094563712', //FB App ID
        cookie: true,  //enable cookies to allow the server to access the session
        xfbml: true,  //parse social plugins on this page
        version: 'v5.0' //use this graph api version 3.2
    });
};
// Load the JavaScript SDK asynchronously

((d, s, id) => {
  const js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');