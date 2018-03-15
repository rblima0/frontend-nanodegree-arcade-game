// INIMIGO
var Enemy = function(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.sprite = 'images/enemy-bug.png';
    this.colid = false;
};

Enemy.prototype.update = function(dt) {
    this.x += this.velocity * dt;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLAYER
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.colid = false;
};

Player.prototype.update = function(dt) {
   // this.x += this.velocity * dt;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(code) {

    if(code === 'up') {
        this.y -= 83;
    } else if (code === 'down') {
        this.y += 83;
    } else if(code === 'left') {
        this.x -= 100;
    } else if(code === 'right') {
        this.x += 100;
    } 
}

// CHECANDO A COLISÃO
Player.prototype.collision = function(){

}

var allEnemies = [];
var player = new Player(200, 400);
var enemyOne = new Enemy(5, 60, 70);
var enemyTwo = new Enemy(5, 140, 30);
var enemyThree = new Enemy(5, 220, 60);
var enemyFour = new Enemy(5, 300, 40);

/* var enemyOne = new Enemy(5, 60, 50);
var enemyTwo = new Enemy(105, 140, 50);
var enemyThree = new Enemy(205, 220, 50);
var enemyFour = new Enemy(305, 300, 50); */

allEnemies.push(enemyOne, enemyTwo, enemyThree, enemyFour);

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
