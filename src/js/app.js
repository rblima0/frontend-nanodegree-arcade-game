// INIMIGO
var Enemy = function(x, y, originalY, velocity, enemyName) {
    this.x = x;
    this.y = y;
    this.originalY = originalY;
    this.velocity = velocity;
    this.sprite = "images/enemies/"+this.enemyName+"-"+this.position+".png";
    this.position = 1;
    this.positionTotal = 7;
    this.collid = false;
    this.enemyName = enemyName;
};

Enemy.prototype.update = function(dt) {
    if (this.x < 470) {
        if ((parseInt(this.x % 10)) === 0) {
            this.position++;
        } if(this.position == this.positionTotal){
            this.position = 1;
        }
    }

    this.x += this.velocity * dt;
    this.sprite = "images/enemies/"+this.enemyName+"-"+this.position+".png";
    
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
    this.character = "boy";
    this.sprite = "images/character/"+this.character+"-down.png";
    this.collid = false;
    this.lives = 3;
    this.level = 1;
    this.gameOver = false;
    this.winner = false;
    this.progress = 0;
};

Player.prototype.update = function(dt) {
    this.collision(allEnemies);

    if(player.y <= 0) {
        this.progress+=500;
        this.level++;
        this.x = 200;
        this.y = 460;     
        if(this.level == 7) {
            this.level = 6;
        }
    }
};

Player.prototype.render = function() {
    //randomEnemies();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(code) {
    if((code === 'up') && (this.y > -15)) {
        this.sprite = "images/character/"+this.character+"-up.png";
        this.y -= 80;
    } else if ((code === 'down') && (this.y < 400)) {
        this.sprite = "images/character/"+this.character+"-down.png";
        this.y += 80;
    } else if((code === 'left') && (this.x > 0)) {
        this.sprite = "images/character/"+this.character+"-left.png";
        this.x -= 100;
    } else if((code === 'right') && (this.x < 400)) {
        this.sprite = "images/character/"+this.character+"-right.png";
        this.x += 100;
    }
}

Player.prototype.reset = function() {
    this.progress-=100;
    this.x = 200;
    this.y = 460;
    this.lives--;
};

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
            this.reset();
        }
    }
}

// INIMIGOS RANDOMICOS CONFORME O NIVEL
Player.prototype.randomEnemies = function(){
// DESERTO

// FLORESTA

// CASTELO

// CASA
}

// SELECIONANDO UM PERSONAGEM
$("#boy").on("click", function(){
    player.sprite = "images/character/boy-down.png";
    player.character = 'boy';
    $('.modalCharacter').css("display", "none");    
});

$("#girl").on("click", function(){
    player.sprite = "images/character/girl-down.png";
    player.character = 'girl';
    $('.modalCharacter').css("display", "none");    
});

$("#king").on("click", function(){
    player.sprite = "images/character/king-down.png";
    player.character = 'king';
    $('.modalCharacter').css("display", "none");    
});

var allEnemies = [];
var enemiesNames = ['troll-boss', 'troll-old', 'troll'];

var player = new Player(200, 460);
var enemyOne = new Enemy(-80, 60, 60, 80, enemiesNames[Math.floor(enemiesNames.length*Math.random())]);
var enemyTwo = new Enemy(-80, 140, 140, 180, enemiesNames[Math.floor(enemiesNames.length*Math.random())]);
var enemyThree = new Enemy(-80, 220, 220, 60, enemiesNames[Math.floor(enemiesNames.length*Math.random())]);
var enemyFour = new Enemy(-80, 300, 300, 140, enemiesNames[Math.floor(enemiesNames.length*Math.random())]);

allEnemies.push(enemyOne, enemyTwo, enemyThree, enemyFour);