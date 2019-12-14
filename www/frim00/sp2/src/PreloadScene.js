import Phaser, { Scene } from 'phaser';

class PreloadScene extends Scene {
  constructor() {
    super('title');
  }

  preload() {
    this.load.image('logo', 'assets/logo.png');
    this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
  }

  create() {
    const background = this.add.graphics();
    background.fillGradientStyle(0x1d2671, 0xc33764);
    background.fillRect(0, 0, 800, 600);

    const logo = this.add.image(400, 250, 'logo');
    logo.setDepth(99);

    const p = this.add.particles('flares');
    const e = p.createEmitter();
    e.setFrame(['red', 'blue', 'green', 'yellow']);
    e.setPosition(400, 250);
    e.setSpeed(100);
    e.setLifespan(2000);
    e.setBlendMode(Phaser.BlendModes.ADD);

    const playButton = this.add.text(400, 500, 'Play', {
      fontFamily: 'Arial Black',
      fontSize: 74,
      color: '#c33764',
    });
    playButton.setStroke('#1d2671', 16);
    playButton.setInteractive({ useHandCursor: true });
    playButton.on('pointerdown', () => this.scene.start('game'));
    playButton.setOrigin(0.5);
  }
}

export default PreloadScene;
