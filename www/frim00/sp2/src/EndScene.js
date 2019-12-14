import { Scene } from 'phaser';

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
    }
    window.localStorage.setItem('highScore', this.highScore);
    console.log(localStorage.getItem('highScore'));
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
  }

  create() {
    const sky = this.add.image(0, 0, 'sky');
    sky.setOrigin(0, 0);
  }
}

export default GameOverScene;
