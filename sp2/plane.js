var SnakeGame = (function (Sn) {

    Sn.Plane = function Plane(height, width) {
          this.height = height;
          this.width = width;
          this.plane = [];
          this.snake = [];
          this.apples = [];
          this.quickAndDirtyLoseCondition = false;
    };
  
      Sn.Plane.prototype.step = function() {
          this.render();
  
          while (this.apples.length == 0) {
              this.placeApple();
          }
          this.moveSnake();
  
          console.log(this.lose());
          if (this.lose() || this.quickAndDirtyLoseCondition) {
              console.log(this.snake[0].pos[0]);
              console.log(this.snake[0].pos[1]);
              clearInterval(this.loop);
          }
      };
  
      Sn.Plane.prototype.eaten = function (obj, head) {
          if (head.pos[0] == obj.pos[0] && head.pos[1] == obj.pos[1]) {
              return true;
          }
          return false;
      };
  
      Sn.Plane.prototype.gameLoop = function () {
          var that = this
          this.loop = setInterval(function () {
              that.step();
          }, 250)
      };
  
      Sn.Plane.prototype.hitWall = function () {
          // console.log(this.snake[0].pos[1]);
          // console.log(this.snake[0].pos[1] < 0);
          if (this.snake[0].pos[0] < 0 || this.snake[0].pos[1] < 0) {
              return true;
          }
          else if (this.snake[0].pos[0] >= this.height ||
                                                                                      this.snake[0].pos[1] >= this.width) {
              return true;
          }
  
          return false;
      };
  
      Sn.Plane.prototype.lose = function () {
          var that = this;
  
          this.snake.slice(1, this.snake.length).forEach(function (el) {
              if (that.eaten(el, that.snake[0])) {
  
                  return that.loseCondition = true;
              }
          });
  
          if (this.hitWall()) {
              return true;
          }
  
          return false;
      };
  
      Sn.Plane.prototype.moveSnake = function () {
          var that = this;
  
          var head = this.snake.shift();
          var prevHeadPos = head.pos;
  
          switch (head.direction) {
          case 'north':
              head.pos = [head.pos[0] - 1, head.pos[1]];
              break;
          case 'south':
              head.pos = [head.pos[0] + 1, head.pos[1]];
              break;
          case 'west':
              head.pos = [head.pos[0], head.pos[1] - 1];
              break;
          case 'east':
              head.pos = [head.pos[0], head.pos[1] + 1];
          }
  
          var justAte = false;
          this.apples.forEach(function (apple, idx) {
              if (that.eaten(apple, head)) {
                  justAte = true;
                  console.log(that.apples[idx]);
                  that.apples.splice(idx, 1);
              }
          });
  
          var tail;
          if (justAte) {
              tail = new Sn.Snake();
          }
          else {
              tail = this.snake.pop();
          }
  
          if (justAte) {
              // Skip next else if statement
              justAte = false;
          }
          else if (that.eaten(tail, head)) {
  
              this.quickAndDirtyLoseCondition = true;
          }
  
          tail.pos = prevHeadPos;
          this.snake.unshift(tail);
  
  
          this.snake.unshift(head);
      };
  
      Sn.Plane.prototype.newPlane = function () {
          var newPlane = [];
  
          for (var i = 0; i < this.height; i++) {
              var newRow = [];
  
              for (var j = 0; j < this.width; j++) {
                  newRow.push(null);
              }
              newPlane.push(newRow);
          }
  
          return newPlane;
      };
  
      Sn.Plane.prototype.placeApple = function () {
          var row = Math.floor(Math.random() * this.height);
          var col = Math.floor(Math.random() * this.width);
          var pos = [row, col];
  
          if (!this.seatTaken()) {
              this.apples.push(new Sn.Apple(pos));
          }
      };
  
      Sn.Plane.prototype.render = function () {
          $('body').empty();
  
          for (var i = 0; i < this.height; i++) {
              $('body').append("<div id='div" + i + "'></div>");
              for (var j = 0; j < this.width; j++) {
                  $('#div' + i).append("<span id='span" + i + "_" + j + "'></span>");
              }
          }
  
          this.apples.forEach(function (apple) {
              $('#span' + apple.pos[0] + '_' + apple.pos[1]).addClass('apple');
          });
          this.snake.forEach(function (el) {
              $('#span' + el.pos[0] + '_' + el.pos[1]).addClass('snake');
          });
      };
  
      Sn.Plane.prototype.seatTaken = function (pos) {
          this.snake.forEach(function (el) {
              if (el.pos == pos) {
                  return true;
              }
          });
          this.apples.forEach(function (apple) {
              if (apple.pos == pos) {
                  return true;
              }
          });
          return false;
      };
  
    return Sn;
  })(SnakeGame || {});