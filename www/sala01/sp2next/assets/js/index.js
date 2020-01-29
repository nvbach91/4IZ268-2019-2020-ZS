$(function() {

    var api_url = 'https://accounts.spotify.com/authorize'
    var client_id = '8c7602a751304da5aecb8e4c9a3a6a6f'
    var redirect_uri = 'https://eso.vse.cz/~sala01/sp2/quiz.html'
    var scopes = "user-read-private user-read-email streaming user-modify-playback-state user-read-playback-state user-library-modify"
  
    $("#btn").click(function(event) {
      window.location.assign(api_url + "?client_id=" + client_id + "&redirect_uri=" + encodeURIComponent(redirect_uri) + "&scope=" + encodeURIComponent(scopes) + "&response_type=token&state=123");
    })
  });