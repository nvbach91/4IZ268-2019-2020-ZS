import { Scene } from 'phaser';

const $ = require('jquery');

class GameOverScene extends Scene {
  constructor() {
    super('gameOver');

    this.score = 0;
    this.highScore = 0;
    this.record = 0;
  }

  init(data) {
    this.score = data.score;
    this.highScore = localStorage.getItem('highScore');
    if (this.highScore === 0 || this.highScore < this.score) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore);
    }
  }

  preload() {
    this.load.image('fullscreen', 'assets/fullscreen.png');
  }

  create() {
    const background = this.add.graphics();
    background.fillGradientStyle(0x1d2671, 0xc33764);
    background.fillRect(0, 0, 800, 600);

    this.gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px' });
    this.gameOverText.setOrigin(0.5);

    this.scoreText = this.add.text(200, 400, `Your score: ${this.score}`);

    this.highScoreText = this.add.text(400, 400, `Your high score: ${this.highScore}`);

    const fullscreenButton = this.add.image(768, 32, 'fullscreen');
    fullscreenButton.setDepth(99);
    fullscreenButton.setInteractive({ useHandCursor: true });
    fullscreenButton.on('pointerdown', () => {
      this.scale.toggleFullscreen();
    });

    $.ajax({
      url: 'https://sheetsu.com/apis/v1.0su/4c92b442786b',
      success: (resp) => {
        this.recordText = this.add.text(50, 450, `World record is ${resp[0].score}. If you beat record, please send us screenshot.`, { color: '#c33764' });
        this.recordText.setInteractive({ useHandCursor: true });
        this.recordText.on('pointerdown', () => { window.location.href = 'mailto://frim00@vse.cz'; });
      },
    });

    this.restartButton = this.add.text(200, 500, 'Restart');
    this.restartButton.setInteractive({ useHandCursor: true });
    this.restartButton.on('pointerdown', () => this.scene.start('game'));

    this.shareButton = this.add.text(400, 500, 'Share on Facebook');
    this.shareButton.setInteractive({ useHandCursor: true });
    this.shareButton.on('pointerdown', () => {
      FB.api('/me', function(response) {
        console.log(response);
        alert('Logged in user is ' + response.name);
      });
      FB.api('/472749696765698/feed', 'POST', {'message': 'My highscore is ' + localStorage.getItem('highScore') }, function (resp) {
        if (resp && !resp.error) {
          console.log(resp);
        }
      });

/*
      FB.login(function(response) {
        if (response.authResponse) {
          FB.api('/me', function(response) {
            console.log(response);
            alert('Logged in user is ' + response.name);
          });
          FB.api('/472749696765698/feed', 'POST', {'message': 'My highscore is ' + localStorage.getItem('highScore') }, function (resp) {
            if (resp && !resp.error) {
              console.log(resp);
            }
          });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'publish_to_groups,groups_access_member_info'});
    */
    });
  }
}

export default GameOverScene;
