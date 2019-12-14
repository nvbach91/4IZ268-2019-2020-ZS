import { Scene } from 'phaser';

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

class GameOverScene extends Scene {
  constructor() {
    super('gameOver');

    this.score = 0;
    this.highScore = 0;
  }

  init(data) {
    this.score = data.score;
    this.highScore = localStorage.getItem('highScore');
    if (this.highScore === 0 || this.highScore < this.score) {
      this.highScore = this.score;
      localStorage.setItem('highScore', this.highScore);
    }
    
  }

  create() {
    const background = this.add.graphics();
    background.fillGradientStyle(0x1d2671, 0xc33764);
    background.fillRect(0, 0, 800, 600);

    this.gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px' });
    this.gameOverText.setOrigin(0.5);

    this.scoreText = this.add.text(200, 400, `Your score: ${this.score}`);

    this.highScoreText = this.add.text(400, 400, `Your high score: ${this.highScore}`);

    this.restartButton = this.add.text(200, 500, 'Restart');
    this.restartButton.setInteractive({ useHandCursor: true });
    this.restartButton.on('pointerdown', () => this.scene.start('game'));

    this.shareButton = this.add.text(400, 500, 'Share on Facebook');
    this.shareButton.setInteractive({ useHandCursor: true });
    this.shareButton.on('pointerdown', () => {
      FB.ui({
        method: 'share',
        href: window.location.href,
        hashtag: '#StargazerGame',
      }, (response) => {
        if (!response) {
          console.log('User did not share the page.');
        } else {
          console.log('User shared the page!');
        }
      });
    });
  }
}

export default GameOverScene;
