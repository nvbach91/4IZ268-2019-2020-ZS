$(document).ready(() => {
    var api_url = 'https://accounts.spotify.com/authorize';
    var client_id = '8c7602a751304da5aecb8e4c9a3a6a6f';
    var scope = 'user-read-private user-read-email';
    var redirect_uri = 'file:///Users/salkaev/Desktop/Study/WeboveTechnologie/sp2/4IZ268-2019-2020-ZS/www/sala01/sp2/index.html'  
    var express = require('express');
    var app = express();

    app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

    console.log(querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }))

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
  });