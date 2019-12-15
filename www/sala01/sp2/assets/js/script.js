$(document).ready(() => {
    var express = require('express'); // Express web server framework
    var request = require('request'); // "Request" library
    var cors = require('cors');
    var querystring = require('querystring');
    var cookieParser = require('cookie-parser');
    
    var client_id = 'e587ab61444f45749d5e7b51b03cde25'; // Your client id
    var client_secret = '867713fd683347d9aa1bdc87f0d867b1'; // Your secret
    var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
    
    function fuckdo() {
      app.use(express.static(__dirname + '/public'))
      .use(cors())
      .use(cookieParser());
  
      app.get('/login', function(req, res) {
        res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        })
      );
      });
    };

  });