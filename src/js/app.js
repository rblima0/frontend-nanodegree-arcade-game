var Obstacle = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = "images/itens/rock.png";
}

Obstacle.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// CLASSE DO INIMIGO
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

// CLASSE DO JOGADOR
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

    if(this.y <= 0 && this.gameOver != true) {
        this.progress+=500;
        this.level++;
        this.x = 200;
        this.y = 460;     
        if(this.level == 7) {
            this.progress-=500;
            this.level = 6;
        }
    }
};

Player.prototype.render = function() {
    this.randomEnemies();
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

    for (let i = 0; i < allObstacles.length; i++) {
        const obstacle = allObstacles[i];
        if(player.x == obstacle.x || player.y == obstacle.y) {

        }
    }
}

// INIMIGOS RANDOMICOS CONFORME O NIVEL
Player.prototype.randomEnemies = function(){
    if(this.level == 2){
        allEnemies = [];
        allEnemies.push(enemyDirtOne, enemyDirtTwo, enemyDirtThree, enemyDirtFour);
    } else if(this.level == 3) {
        allEnemies = [];
        allEnemies.push(enemyForestOne, enemyForestTwo, enemyForestThree, enemyForestFour);
    } else if(this.level == 4) {
        allEnemies = [];
        allEnemies.push(enemyDoorsOne, enemyDoorsTwo, enemyDoorsThree, enemyDoorsFour);
    } else if(this.level == 5) {
        allEnemies = [];
        allEnemies.push(enemyCastleOne, enemyCastleTwo, enemyCastleThree, enemyCastleFour);
    }
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

var player = new Player(200, 460);

var allEnemies = [];
var enemiesDesert = ['troll-worker', 'troll-man', 'troll-woman'];
var enemiesForest = ['troll-warrior', 'troll-ancient', 'troll-woman'];
var enemiesCastle = ['silver-warrior', 'bronze-warrior', 'gold-warrior'];

// INIMIGOS DO NIVEL 1
var enemyDesertOne = new Enemy(-80, 60, 60, 80, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);
var enemyDesertTwo  = new Enemy(-80, 140, 140, 180, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);
var enemyDesertThree  = new Enemy(-80, 220, 220, 60, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);
var enemyDesertFour  = new Enemy(-80, 300, 300, 140, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);

// INIMIGOS DO NIVEL 2
var enemyDirtOne = new Enemy(-80, 60, 60, 80, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);
var enemyDirtTwo  = new Enemy(-80, 140, 140, 180, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);
var enemyDirtThree  = new Enemy(-80, 220, 220, 60, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);
var enemyDirtFour  = new Enemy(-80, 300, 300, 140, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);

// INIMIGOS DO NIVEL 3
var enemyForestOne = new Enemy(-80, 60, 60, 60, enemiesForest[Math.floor(enemiesForest.length*Math.random())]);
var enemyForestTwo = new Enemy(-80, 140, 140, 190, enemiesForest[Math.floor(enemiesForest.length*Math.random())]);
var enemyForestThree = new Enemy(-80, 220, 220, 80, enemiesForest[Math.floor(enemiesForest.length*Math.random())]);
var enemyForestFour = new Enemy(-80, 300, 300, Math.random() * (200 - 140) + 140, enemiesForest[Math.floor(enemiesForest.length*Math.random())]);

// INIMIGOS DO NIVEL 4
var enemyDoorsOne = new Enemy(-80, 60, 60, 200, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);
var enemyDoorsTwo = new Enemy(-80, 140, 140, Math.random() * (200 - 110) + 110, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);
var enemyDoorsThree = new Enemy(-80, 220, 220, 60, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);
var enemyDoorsFour = new Enemy(-80, 300, 300, Math.random() * (200 - 110) + 110, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);

// INIMIGOS DO NIVEL 5
var enemyCastleOne = new Enemy(-80, 60, 60, 200, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);
var enemyCastleTwo = new Enemy(-80, 140, 140, Math.random() * (200 - 110) + 110, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);
var enemyCastleThree = new Enemy(-80, 220, 220, 60, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);
var enemyCastleFour = new Enemy(-80, 300, 300, Math.random() * (200 - 110) + 110, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);

allEnemies.push(enemyDesertOne, enemyDesertTwo, enemyDesertThree, enemyDesertFour);


var allObstacles = [];
var ObstacleOne = new Obstacle(300, 380);
allObstacles.push(ObstacleOne);