// INIMIGO
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {

};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLAYER
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(code) {

}

var allEnemies = [];
var player = new Player(200, 400);
var enemyOne = new Enemy(5, 60);
var enemyTwo = new Enemy(105, 140);
var enemyThree = new Enemy(205, 220);
var enemyFour = new Enemy(305, 300);

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
