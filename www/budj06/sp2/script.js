var SnakeGame = (function (Sn) {

    Sn.Snake = function Snake () {
          this.head = false;
          this.direction;
          this.pos;
    };
  
      Sn.Snake.prototype.turn = function(direction) {
          this.direction = direction;
      };
  
    return Sn;
  })(SnakeGame || {});