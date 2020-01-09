import { Game } from 'phaser';
import config from './gameConfig';

const $ = require('jquery');

var game = new Game(config);

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
