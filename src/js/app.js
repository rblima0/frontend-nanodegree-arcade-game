// INIMIGO
var Enemy = function(x, y, originalY, velocity) {
    this.x = x;
    this.y = y;
    this.originalY = originalY;
    this.velocity = velocity;
    this.sprite = 'images/enemy-bug.png';
    this.collid = false;
};

Enemy.prototype.update = function(dt) {
    this.x += this.velocity * dt;
    if (this.x >= 470) {
        this.reset();
    } 
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    if (this.x > 470) {
        this.x = Math.random() * -80;
        this.y = this.originalY;
        this.velocity = Math.random() * (200 - 110) + 110;
    }
};

// PLAYER
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
    this.collid = false;
};

Player.prototype.update = function(dt) {
    this.collision(allEnemies);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 460;
};

Player.prototype.handleInput = function(code) {
    if((code === 'up') && (this.y > -15)) {
        this.y -= 80;
    } else if ((code === 'down') && (this.y < 400)) {
        this.y += 80;
    } else if((code === 'left') && (this.x > 0)) {
        this.x -= 100;
    } else if((code === 'right') && (this.x < 400)) {
        this.x += 100;
    }
}

// CHECANDO A COLISÃO
Player.prototype.collision = function(enemyList){
    for (let i = 0; i < enemyList.length; i++) {
        var playerUp = this.y;
        var playerDown = this.y + 72;
        var playerLeft = this.x;
        var playerRight = this.x + 65;

        var enemyUp = enemyList[i].y;
        var enemyDown = enemyList[i].y + 65;
        var enemyLeft = enemyList[i].x;
        var enemyRight = enemyList[i].x + 80;
        
        if ((playerUp <= enemyDown) && (playerDown >= enemyUp) && (playerLeft <= enemyRight) && (playerRight >= enemyLeft)) {
            this.collid = true;
            enemyList[i].collid = true;
            resetGame();
            return true;
        }
    }
}

function resetGame() {
    setTimeout(() => {
        player.reset();
    }, 400);
}

var allEnemies = [];
var player = new Player(200, 460);

var enemyOne = new Enemy(-80, 60, 60, 80);
var enemyTwo = new Enemy(-80, 140, 140, 180);
var enemyThree = new Enemy(-80, 220, 220, 60);
var enemyFour = new Enemy(-80, 300, 300, 140);

/* var enemyOne = new Enemy(-80, 60, 60, 10);
var enemyTwo = new Enemy(-80, 140, 140, 10);
var enemyThree = new Enemy(-80, 220, 220, 20);
var enemyFour = new Enemy(-80, 300, 300, 10); */

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
