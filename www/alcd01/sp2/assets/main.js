/**
 * fill form for name and starting game
 */
$("#play").click(function() {
    play();
    $("canvas").wrap("<div class='window'></div>")
    var name = $("#inputName").val();
    $.session.set("inputName", name);
    $('main').remove();
    console.log($.session.get("inputName"));
})

function play() {
    /**game window creating
     * declaring game physics
     * declaring order of scene crating in window
     */
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    //declaring variables
    var player;
    var stars;
    var bombs;
    var platforms;
    var cursors;
    var score = 0;
    var gameOver = false;
    var scoreText;

    var game = new Phaser.Game(config);
    /**image preload */
    function preload() {
        /**loading screen 1 */
        $(".window").parent().append("<div class='loading'>LOADING</div>");
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png', { frameWidth: 32, frameHeight: 48 }
        );
        /**music preload */
        this.load.audio('end', 'assets/end.mp3');
        this.load.audio('collect', 'assets/collect.mp3');
        this.load.audio('jump', 'assets/jump.mp3');
        this.load.audio('themeSound', 'assets/Platformer2.mp3');

    }
    /**creating objects in scene */
    function create() {
        $(".loading").remove();
        /**creating background sound scene */
        var themeSound = this.sound.add('themeSound', 'loop: true');
        themeSound.play();
        /**background */
        this.add.image(0, 0, 'sky').setOrigin(0, 0)
            /**platforms */
        platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        /**player */
        player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.3);
        player.setCollideWorldBounds(true);
        //acceleration
        player.setMaxVelocity(320, 320);


        /**player animations */
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        /**defines  controling by keyboard*/
        cursors = this.input.keyboard.createCursorKeys();



        /**creating collectable stars */
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function(child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        /**creating bombs */
        bombs = this.physics.add.group();

        /**creating score field*/
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

        /**coliders */
        //dynamic objects(player) colidating with static object(platform)
        this.physics.add.collider(player, platforms);
        //stars wont fall out of scene
        this.physics.add.collider(stars, platforms);

        this.physics.add.collider(bombs, platforms);

        this.physics.add.collider(player, bombs, hitBomb, null, this);
        //stars wont be in front of our character
        this.physics.add.overlap(player, stars, collectStar, null, this);
    }

    /**updating game scene based on interaction in game */
    function update() {
        if (gameOver) {
            return;
        }
        /**updates game after action from input
         * Cursor keys are defined as input, we are listenig to
         */
        //movement left
        if (cursors.left.isDown) {

            player.setAccelerationX(-200);
            player.anims.play('left', true);
        }
        //movement right 
        else if (cursors.right.isDown) {

            player.setAccelerationX(200);
            player.anims.play('right', true);
        }
        //standing(not clicking on anything)
        else {
            player.setAcceleration(0, 0);
            player.setDrag(500, 0);
            player.anims.play('turn');
        }
        //jumping
        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
            this.sound.play('jump');
        }
    }
    /** collecting and counting score */
    function collectStar(player, star) {
        star.disableBody(true, true);
        this.sound.play('collect');

        //score update
        score += 10;
        scoreText.setText('Score: ' + score);

        /**bomb relase */
        if (stars.countActive(true) === 0) {
            //reseting stars on scene
            stars.children.iterate(function(child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }
    }

    /**Game over
     * when hit by bomb
     */
    /**Game over
     * when hit by bomb
     */
    function hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);

        player.anims.play('turn');
        this.sound.play('end');
        gameOver = true;
    }

}