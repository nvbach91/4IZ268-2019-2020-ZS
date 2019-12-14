import { Scene } from 'phaser';

class TitleScene extends Scene {
  constructor() {
    super('title');
  }

  create() {
    const play = this.add.text(20, 50, 'Play', {
      fontFamily: 'Arial Black',
      fontSize: 74,
      color: '#c51b7d',
    });
    play.setStroke('#de77ae', 16);
  }
}

export default TitleScene;
