import Phaser, { Scene } from 'phaser';

var photoUrl;

class PreloadScene extends Scene {
  constructor() {
    super('title');
  }

  preload() {
    this.load.image('logo', 'assets/logo.png');
    this.load.image('fullscreen', 'assets/fullscreen.png');
    this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
  }

  create() {
    const background = this.add.graphics();
    background.fillGradientStyle(0x1d2671, 0xc33764);
    background.fillRect(0, 0, 800, 600);

    const logo = this.add.image(400, 250, 'logo');
    logo.setDepth(90);

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

    const fullscreenButton = this.add.image(768, 32, 'fullscreen');
    fullscreenButton.setDepth(99);
    fullscreenButton.setInteractive({ useHandCursor: true });
    fullscreenButton.on('pointerdown', () => {
      this.scale.toggleFullscreen();
    });

    var fbName = this.add.text(16, 568, '', {
      fontSize: '16px',
      fill: '#ffffff',
    });
    var fbPhoto = this.add.image(400, 568);
    fbPhoto.setOrigin(0.5);

    const loginButton = this.add.text(16, 16, 'Login', {
      fontSize: '16px',
      fill: '#ffffff',
    });
    loginButton.setInteractive({ useHandCursor: true });
    loginButton.on('pointerdown', (photoUrl) => {
      FB.login(function(resp, photoUrl) {
        console.log(resp);
        FB.api(
          '/me',
          'GET',
          {fields: 'picture, name'},
          function(response, photoUrl) {
            logoutButton.visible = true;
            loginButton.visible = false;
            console.log(response);
            fbName.setText(response.name);

            //photoUrl = response.picture.data.url;
            photoUrl = 'xxxx';
            /*
            this.load.image('profile_photo', response.picture.data.url);
            this.load.start();
            fbPhoto.setTexture('profile_photo');
            $('img').attr('src', response.picture.data.url);
            $('span').text(response.name);
            */
          }
        );
      }, {scope: 'publish_to_groups,groups_access_member_info'});
      console.log(photoUrl);
    }, this);

    const logoutButton = this.add.text(16, 16, 'Logout', {
      fontSize: '16px',
      fill: '#ffffff',
    });
    logoutButton.setInteractive({ useHandCursor: true });
    logoutButton.on('pointerdown', () => {
      FB.logout(function(response) {
        logoutButton.visible = false;
        loginButton.visible = true;
      });
    });
    logoutButton.visible = false;
  }
}

export default PreloadScene;
