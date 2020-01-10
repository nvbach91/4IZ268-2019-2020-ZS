import { Game } from 'phaser';
import config from './gameConfig';

const $ = require('jquery');

var game = new Game(config);

$('img').hide();

window.fbAsyncInit = () => {
    FB.init({
      appId: '562251094563712',
      cookie: true,
      xfbml: true,
      version: 'v5.0',
    });
  };
  
((d, s, id) => {
  let js = d.getElementsByTagName(s)[0];
  const fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

/*
$('#login').click(function(){
  FB.login(function(resp) {
    FB.api(
      '/me',
      'GET',
      {fields: 'picture, name'},
      function(response) {
          console.log(response);
          $('img').show();
          $('img').attr('src', response.picture.data.url);
          $('span').show();
          $('span').text(response.name);
      }
    );

  }, {scope: 'publish_to_groups,groups_access_member_info'});
});

$('#logout').click(function(){
  FB.logout(function(response) {
    $('img').hide();
    $('span').hide();
  });
});
*/
