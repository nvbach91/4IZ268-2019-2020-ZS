/**
 * Updating scoreBoard using local storage
 */

/**
 * Updating lastScore using local storage
 */
$(document).ready(function() {
  document.querySelector(
    ".scoreTable"
  ).rows[0].cells[0].textContent = localStorage.getItem("firstName");
  document.querySelector(
    ".scoreTable"
  ).rows[0].cells[1].textContent = localStorage.getItem("firstScore");

  document.querySelector(
    ".scoreTable"
  ).rows[1].cells[0].textContent = localStorage.getItem("secondName");
  document.querySelector(
    ".scoreTable"
  ).rows[1].cells[1].textContent = localStorage.getItem("secondScore");

  document.querySelector(
    ".scoreTable"
  ).rows[2].cells[0].textContent = localStorage.getItem("thirdName");
  document.querySelector(
    ".scoreTable"
  ).rows[2].cells[1].textContent = localStorage.getItem("thirdScore");

  document.querySelector(
    ".scoreTable"
  ).rows[3].cells[0].textContent = localStorage.getItem("fourthName");
  document.querySelector(
    ".scoreTable"
  ).rows[3].cells[1].textContent = localStorage.getItem("fourthScore");

  document.querySelector(
    ".scoreTable"
  ).rows[4].cells[0].textContent = localStorage.getItem("fifthName");
  document.querySelector(
    ".scoreTable"
  ).rows[4].cells[1].textContent = localStorage.getItem("fifthScore");

  $("#lastScoreList li").remove();
  lastScores = localStorage.getItem("lastScores");
  lastScoresEdited = lastScores.split(".").join("<br>");
  /*for (let index = 0; index < lastScores.length; index++) {
        var char = lastScores.charAt(index);
        if (!["."].includes(char)) {
            console.log(char)
        }
    }*/

  $("#lastScoreList").append("<li>" + lastScoresEdited + "</li>");

  console.log(lastScoresEdited);
});

/**
 * removing data from lastScore
 */
$(document).ready(function() {
  $("#lastScoreList li").click(function(e) {
    $(this).remove();
  });
});

/**
 * fill form for name and starting game
 */
$(document).ready(function() {
  $("#play").click(function() {
    if ($("#inputName").val() != 0) {
      $(".errorName").remove();
      play();
      $("canvas").wrap("<div class='window'></div>");
      var name = $("#inputName").val();
      $.session.set("inputName", name);
      //local Storage
      localStorage.setItem("nameLocalStorage", name);

      $("main").remove();
      console.log(localStorage.getItem("nameLocalStorage"));
      console.log($.session.get("inputName"));
      //loading screen
      $(".window")
        .parent()
        .append("<div class='loading'>LOADING</div>");
    } else {
      $("main")
        .parent()
        .append("<div class='errorName'>Please enter name</div>");
      return null;
    }
  });
});

function play() {
  /**game window creating
   * declaring game physics
   * declaring order of scene crating in window
   */
  config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: "arcade",
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
  var lvl = 1;
  var lvlText;

  game = new Phaser.Game(config);
  /**image preload */
  function preload() {
    /**loading screen 1 */

    this.load.image("background", "assets/background.png");
    this.load.image("basePlatform", "assets/ground.png");
    this.load.image("platform1", "assets/platform1.png");
    this.load.image("platform2", "assets/platform2.png");
    this.load.image("platform3", "assets/platform3.png");
    this.load.image("star", "assets/goldCoin5.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude4.png", {
      frameWidth: 34,
      frameHeight: 38
    });
    /**music preload */
    this.load.audio("end", "assets/end.mp3");
    this.load.audio("collect", "assets/collect.mp3");
    this.load.audio("jump", "assets/jump.mp3");
    this.load.audio("themeSound", "assets/Platformer2.mp3");
  }
  /**creating objects in scene */
  function create() {
    $(".loading").remove();
    document.getElementById("before").style.display = "none";
    /**creating background sound scene */
    var themeSound = this.sound.add("themeSound", "loop: true");
    themeSound.play();
    /**background */
    this.add.image(0, 0, "background").setOrigin(0, 0);
    /**platforms */
    platforms = this.physics.add.staticGroup();
    //platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(400, 584, "basePlatform");

    platforms.create(397, 430, "platform1");

    platforms.create(200, 300, "platform2");
    platforms.create(600, 300, "platform2");

    platforms.create(50, 200, "platform1");
    platforms.create(750, 200, "platform1");

    platforms.create(397, 100, "platform3");
    /**player */
    player = this.physics.add.sprite(100, 450, "dude");

    player.setBounce(0.3);
    player.setCollideWorldBounds(true);
    //acceleration
    player.setMaxVelocity(320, 320);

    /**player animations */
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: this.anims.generateFrameNumbers("dude", { start: 6, end: 9 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 10, end: 15 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "death",
      frames: [{ key: "dude", frame: 16 }],
      frameRate: 20
    });

    this.anims.create({
      key: "jumping",
      frames: this.anims.generateFrameNumbers("dude", { start: 17, end: 18 }),
      frameRate: 10,
      repeat: -1
    });

    /**defines  controling by keyboard*/
    cursors = this.input.keyboard.createCursorKeys();

    /**creating collectable stars */

    stars = this.physics.add.group({
      key: "star",
      repeat: 15,
      setXY: { x: 25, y: 0, stepX: 50 }
    });

    stars.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    /**creating bombs */
    bombs = this.physics.add.group();

    /**creating score field*/
    scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "24px",
      fill: "#ffffff",
      fontFamily: '"Press Start 2P", cursive'
    });
    /**creating level field */
    lvlText = this.add.text(600, 16, "level: 0", {
      fontSize: "24px",
      fill: "#ffffff",
      fontFamily: '"Press Start 2P", cursive'
    });
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
      player.anims.play("left", true);
    }
    //movement right
    else if (cursors.right.isDown) {
      player.setAccelerationX(200);
      player.anims.play("right", true);
    }
    //standing(not clicking on anything)
    else {
      player.setAcceleration(0, 0);
      player.setDrag(500, 0);
      player.anims.play("turn", true);
    }
    //jumping
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
      this.sound.play("jump");
    }
    //jump anim
    if (cursors.up.isDown) {
      player.anims.play("jumping", true);
    }
  }

  /** collecting and counting score */
  function collectStar(player, star) {
    star.disableBody(true, true);
    this.sound.play("collect");

    //score update
    score += 10;
    scoreText.setText("Score: " + score);

    /**bomb relase */
    if (stars.countActive(true) === 0) {
      //level update
      lvl += 1;
      lvlText.setText("Level: " + lvl);
      //reseting stars on scene
      stars.children.iterate(function(child) {
        child.enableBody(true, child.x, 0, true, true);
      });

      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      var bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;
    }
  }
  /**Game over
   * when hit by bomb
   */
  function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);

    player.anims.play("death");
    this.sound.play("end");
    gameOver = true;

    $(".window").before(
      "<div class='preRestart'>Click on the screen to continue</div>"
    );
    //writing score in local storage
    // Get Item from LocalStorage or highScore === 0
    var highScore = localStorage.getItem("highScore") || 0;

    // If the user has more points than the currently stored high score then
    if (score > highScore) {
      // Set the high score to the users' current points
      highScore = parseInt(score);
      // Store the high score
      localStorage.setItem("highScore", highScore);
    }
    console.log(highScore);
    console.log(localStorage.getItem("highScore"));
    localStorage.setItem("score", score);
    // Return the scoreBoard
    document.getElementById("before").style.display = "inline";

    /**
     * last played games
     */

    if ($("li").length < 5) {
      $("ol")
        .parent()
        .append(
          "<li>" +
            localStorage.getItem("nameLocalStorage") +
            " " +
            localStorage.getItem("score") +
            "." +
            "</li>"
        );
    } else {
      var lis = document.getElementsByTagName("li");
      lis[0].remove();
      $("ol")
        .parent()
        .append(
          "<li>" +
            localStorage.getItem("nameLocalStorage") +
            " " +
            localStorage.getItem("score") +
            "." +
            "</li>"
        );
    }

    var firstScore = localStorage.getItem("firstScore");
    var secondScore = localStorage.getItem("secondScore");
    var thirdScore = localStorage.getItem("thirdScore");
    var fourthScore = localStorage.getItem("fourthScore");
    var fifthScore = localStorage.getItem("fifthScore");

    var firstName = localStorage.getItem("firstName");
    var secondName = localStorage.getItem("secondName");
    var thirdName = localStorage.getItem("thirdName");
    var fourthName = localStorage.getItem("fourthName");
    var fifthName = localStorage.getItem("fifthName");

    //scoreBoard update
    if (
      score > localStorage.getItem("firstScore") ||
      localStorage.getItem("firstScore") === "null"
    ) {
      //actuallizing top 5
      localStorage.setItem("fifthScore", fourthScore);
      localStorage.setItem("fourthScore", thirdScore);
      localStorage.setItem("thirdScore", secondScore);
      localStorage.setItem("secondScore", firstScore);

      localStorage.setItem("fifthName", fourthName);
      localStorage.setItem("fourthName", thirdName);
      localStorage.setItem("thirdName", secondName);
      localStorage.setItem("secondName", firstName);

      localStorage.setItem("firstScore", score);
      localStorage.setItem(
        "firstName",
        localStorage.getItem("nameLocalStorage")
      );
      topFive();

      console.log(localStorage.getItem("firstScore"));
      console.log(localStorage.getItem("firstName"));
      return $(".window").click(function() {
        return Restart();
      });
    }
    if (
      score > localStorage.getItem("secondScore") ||
      localStorage.getItem("secondScore") === "null"
    ) {
      //actuallizing top 5
      localStorage.setItem("fifthScore", fourthScore);
      localStorage.setItem("fourthScore", thirdScore);
      localStorage.setItem("thirdScore", secondScore);

      localStorage.setItem("fifthName", fourthName);
      localStorage.setItem("fourthName", thirdName);
      localStorage.setItem("thirdName", secondName);

      localStorage.setItem("secondScore", score);
      localStorage.setItem(
        "secondName",
        localStorage.getItem("nameLocalStorage")
      );
      topFive();

      console.log(localStorage.getItem("secondScore"));
      console.log(localStorage.getItem("secondName"));
      return $(".window").click(function() {
        return Restart();
      });
    }
    if (
      score > localStorage.getItem("thirdScore") ||
      localStorage.getItem("thirdScore") === "null"
    ) {
      //actuallizing top 5
      localStorage.setItem("fifthScore", fourthScore);
      localStorage.setItem("fourthScore", thirdScore);

      localStorage.setItem("fifthName", fourthName);
      localStorage.setItem("fourthName", thirdName);

      localStorage.setItem("thirdScore", score);
      localStorage.setItem(
        "thirdName",
        localStorage.getItem("nameLocalStorage")
      );
      topFive();

      console.log(localStorage.getItem("thirdScore"));
      console.log(localStorage.getItem("thirdName"));
      return $(".window").click(function() {
        return Restart();
      });
    }
    if (
      score > localStorage.getItem("fourthScore") ||
      localStorage.getItem("fourthScore") === "null"
    ) {
      //actuallizing top 5
      localStorage.setItem("fifthScore", fourthScore);

      localStorage.setItem("fifthName", fourthName);

      localStorage.setItem("fourthScore", score);
      localStorage.setItem(
        "fourthName",
        localStorage.getItem("nameLocalStorage")
      );
      topFive();

      console.log(localStorage.getItem("fourthScore"));
      console.log(localStorage.getItem("fourthName"));
      return $(".window").click(function() {
        return Restart();
      });
    }
    if (
      score > localStorage.getItem("fifthScore") ||
      localStorage.getItem("fifthScore") === "null"
    ) {
      localStorage.setItem("fifthScore", score);
      localStorage.setItem(
        "fifthName",
        localStorage.getItem("nameLocalStorage")
      );
      topFive();

      console.log(localStorage.getItem("fifthScore"));
      console.log(localStorage.getItem("fifthName"));
      return $(".window").click(function() {
        return Restart();
      });
    } else {
      return $(".window").click(function() {
        return Restart();
      });
    }

    /*function Restart() {
            this.input.on('pointerdown', function() {

                this.sys.game.destroy(true);
                $(".window").remove();
                $("#before").before('<main><h2>PLAY AGAIN?</h2><button id="playAgain">YES!</button><button id="reload">Change name</button></main>');

                document.getElementById('playAgain').addEventListener('click', function newGame() {
                    $('main').remove();

                    game = new Phaser.Game(config);

                    document.removeEventListener('click', newGame);

                    $("canvas").wrap("<div class='window'></div>");
                    $(".window").parent().append("<div class='loading'>LOADING</div>");

                });
                document.getElementById('reload').addEventListener('click', function newGame() {
                    document.removeEventListener('click', newGame);
                    $('main').remove();
                    $("#before").before('<main><h1>SPACE DANGER</h1><label for="name"><input id="inputName" type="text" name="name" required placeholder="Name"></label><button id="play">PLAY!</button></main>');
                    $("#play").click(function() {
                        if ($("#inputName").val() != 0) {
                            $(".errorName").remove();
                            var name = $("#inputName").val();
                            $.session.set("inputName", name);
                            //local Storage
                            localStorage.setItem('nameLocalStorage', name);

                            $('main').remove();
                            console.log(localStorage.getItem('nameLocalStorage'));
                            console.log($.session.get("inputName"));

                            game = new Phaser.Game(config);

                            $("canvas").wrap("<div class='window'></div>");
                            $(".window").parent().append("<div class='loading'>LOADING</div>");
                        } else {
                            $("main").parent().append("<div class='errorName'>Please enter name</div>");
                            return null;
                        }
                    })


                });
            }, this);*/
  }
}

function Restart() {
  LSFLS = $("li").text(); //last scores from local storage
  localStorage.setItem("lastScores", LSFLS);
  console.log(localStorage.getItem("lastScores"));
  game.destroy(true);
  $(".window").remove();
  $(".preRestart").remove();
  $("#before").before(
    '<main><h2>PLAY AGAIN?</h2><button id="playAgain">YES!</button><button id="reload">Change name</button></main>'
  );
  $("#lastScoreList li").click(function(e) {
    $(this).remove();
  });
  $("#playAgain").click(function() {
    play();
    $("canvas").wrap("<div class='window'></div>");
    $("main").remove();
    $(".window")
      .parent()
      .append("<div class='loading'>LOADING</div>");
  });
  $("#reload").click(function() {
    $("main").remove();
    $("#before").before(
      '<main><h1>SPACE DANGER</h1><label for="name"><input id="inputName" type="text" name="name" required placeholder="Name"></label><button id="play">PLAY!</button></main>'
    );
    $("#play").click(function() {
      if ($("#inputName").val() != 0) {
        $(".errorName").remove();
        play();
        var name = $("#inputName").val();
        $.session.set("inputName", name);
        //local Storage
        localStorage.setItem("nameLocalStorage", name);

        $("main").remove();
        console.log(localStorage.getItem("nameLocalStorage"));
        console.log($.session.get("inputName"));

        $("canvas").wrap("<div class='window'></div>");
        return $(".window")
          .parent()
          .append("<div class='loading'>LOADING</div>");
      } else {
        $("main")
          .parent()
          .append("<div class='errorName'>Please enter name</div>");
        return null;
      }
    });
  });
}

function topFive() {
  $(document).ready(function() {
    document.querySelector(
      ".scoreTable"
    ).rows[0].cells[0].textContent = localStorage.getItem("firstName");
    document.querySelector(
      ".scoreTable"
    ).rows[0].cells[1].textContent = localStorage.getItem("firstScore");

    document.querySelector(
      ".scoreTable"
    ).rows[1].cells[0].textContent = localStorage.getItem("secondName");
    document.querySelector(
      ".scoreTable"
    ).rows[1].cells[1].textContent = localStorage.getItem("secondScore");

    document.querySelector(
      ".scoreTable"
    ).rows[2].cells[0].textContent = localStorage.getItem("thirdName");
    document.querySelector(
      ".scoreTable"
    ).rows[2].cells[1].textContent = localStorage.getItem("thirdScore");

    document.querySelector(
      ".scoreTable"
    ).rows[3].cells[0].textContent = localStorage.getItem("fourthName");
    document.querySelector(
      ".scoreTable"
    ).rows[3].cells[1].textContent = localStorage.getItem("fourthScore");

    document.querySelector(
      ".scoreTable"
    ).rows[4].cells[0].textContent = localStorage.getItem("fifthName");
    document.querySelector(
      ".scoreTable"
    ).rows[4].cells[1].textContent = localStorage.getItem("fifthScore");
  });
}
