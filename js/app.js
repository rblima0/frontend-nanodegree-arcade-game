// SUPERCLASSE
const Character = function(x, y){
    this.x = x;
    this.y = y;
}

Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// OBJETO OBSTACULO
const Obstacle = function(x, y, width, height, sprite) {
    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
};

// OBJETO ITEM
const Item = function(x, y, width, height, sprite, progress, lives) {
    this.left = x;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
    this.width = width;
    this.height = height;
    this.sprite = sprite;
    this.progress = progress;
    this.lives = lives;
}

// CLASSE DO INIMIGO
const Enemy = function(x, y, originalY, velocity, enemyName) {
    Character.call(this, x, y);
    this.originalY = originalY;
    this.velocity = velocity;
    this.sprite = "images/enemies/"+this.enemyName+"-"+this.position+".png";
    this.position = 1;
    this.positionTotal = 7;
    this.collid = false;
    this.enemyName = enemyName;
};

Enemy.prototype = new Character();

// ATUALIZA POSIÇÃO DOS INIMIGOS E DA MOVIMENTOS PARA ELES
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

Enemy.prototype.reset = function() {
    if (this.x > 470) {
        this.x = Math.random() * -80;
        this.y = this.originalY;
        this.velocity = Math.random() * (200 - 110) + 110;
    }
};

// CLASSE DO JOGADOR
const Player = function(x, y) {
    Character.call(this, x, y);
    this.character = "boy";
    this.sprite = "images/character/"+this.character+"-down.png";
    this.collid = false;
    this.lives = 3;
    this.level = 1;
    this.gameOver = false;
    this.winner = false;
    this.progress = 0;
};

Player.prototype = new Character();

Player.prototype.update = function(dt) {

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

// VERIFICA SE TEM OBSTACULOS PARA O PLAYER
Player.prototype.checkObstacles = function(obstacles) {

    let block = [];
    let playerUp = this.y;
    let playerDown = this.y + 72;
    let playerRight = this.x + 67;
    let playerLeft = this.x;
    
    for (let i = 0; i < obstacles.length; i++) {
        if (((playerUp - 80) < obstacles[i].bottom) && ((playerDown - 80) > obstacles[i].top) && (playerLeft < obstacles[i].right) && (playerRight > obstacles[i].left)) {
            block.push('up');
        } else if (((playerUp + 80) < obstacles[i].bottom) && ((playerDown + 80) > obstacles[i].top) && (playerLeft < obstacles[i].right) && (playerRight > obstacles[i].left)) {
            block.push('down');
        } else if ((playerUp < obstacles[i].bottom) && (playerDown > obstacles[i].top) && ((playerLeft - 50) < obstacles[i].right) && ((playerRight - 50) > obstacles[i].left)) {
            block.push('left');
        } else if ((playerUp < obstacles[i].bottom) && (playerDown > obstacles[i].top) && ((playerLeft + 50) < obstacles[i].right) && ((playerRight + 50) > obstacles[i].left)) {
            block.push('right');
        }
    }
    return block;
};

// VERIFICA SE TEM ITERAÇÃO DO PLAYER COM ITENS
Player.prototype.checkItens = function(itens) {

    let playerUp = this.y;
    let playerDown = this.y;
    let playerRight = this.x;
    let playerLeft = this.x;
    
    for (let i = 0; i < itens.length; i++) {
        if (((playerUp <= itens[i].bottom) && (playerDown >= itens[i].top)) && 
            ((playerLeft <= itens[i].right) && (playerRight >= itens[i].left))) {
            this.progress += itens[i].progress;
            this.lives += itens[i].lives;
            itens[i].progress = 0;
            itens[i].lives = 0;
            itens[i].sprite = 'images/itens/empty.png';
            return true;
        }
    }
};

// FUNÇÃO DE MOVIMENTO DO PLAYER
Player.prototype.handleInput = function(code, checkBlock) {
    
    if((code === 'up') && (this.y > -20) && (checkBlock.indexOf('up') == -1)) {
        this.sprite = "images/character/"+this.character+"-up.png";
        this.y -= 80;
    } else if ((code === 'down') && (this.y < 460) && (checkBlock.indexOf('down') == -1)) {
        this.sprite = "images/character/"+this.character+"-down.png";
        this.y += 80;
    } else if((code === 'left') && (this.x > 0) && (checkBlock.indexOf('left') == -1)) {
        this.sprite = "images/character/"+this.character+"-left.png";
        this.x -= 100;
    } else if((code === 'right') && (this.x < 400) && (checkBlock.indexOf('right') == -1)) {
        this.sprite = "images/character/"+this.character+"-right.png";
        this.x += 100;
    }

}

// RESET
Player.prototype.reset = function() {
    this.progress-=100;
    this.x = 200;
    this.y = 460;
    this.lives--;
    this.collid = false;
};

// CHECANDO A COLISÃO
Player.prototype.collision = function(enemyList){
    for (let i = 0; i < enemyList.length; i++) {
        
        let playerUp = this.y;
        let playerDown = this.y + 72;
        let playerLeft = this.x;
        let playerRight = this.x + 65;

        let enemyUp = enemyList[i].y;
        let enemyDown = enemyList[i].y + 65;
        let enemyLeft = enemyList[i].x;
        let enemyRight = enemyList[i].x + 80;
        
        if ((playerUp <= enemyDown) && (playerDown >= enemyUp) && (playerLeft <= enemyRight) && (playerRight >= enemyLeft)) {     
            this.reset();
        }
    }
}

// INIMIGOS RANDOMICOS CONFORME O NIVEL
Player.prototype.randomEnemies = function(){
    if(this.level == 2){
        allEnemies = [];
        allEnemies.push(enemyDirtOne, enemyDirtTwo, enemyDirtThree, enemyDirtFour);
        allObstacles = [];
        allObstacles.push(rockDirtThree, rockDirtTwo, rockDirtOne);
        allItens = [];
        allItens.push(itemTwo, itemThree);
    } else if(this.level == 3) {
        allEnemies = [];
        allEnemies.push(enemyForestOne, enemyForestTwo, enemyForestThree, enemyForestFour);
        allObstacles = [];
        allItens = [];
    } else if(this.level == 4) {
        allEnemies = [];
        allEnemies.push(enemyDoorsOne, enemyDoorsTwo, enemyDoorsThree, enemyDoorsFour);
        allObstacles = [];
        allObstacles.push(wallOne, wallTwo, wallThree, wallFour, rockDoorsFour, rockDoorsThree, rockDoorsTwo, rockDoorsOne);
        allItens = [];
        allItens.push(itemFour);
    } else if(this.level == 5) {
        allEnemies = [];
        allEnemies.push(enemyCastleOne, enemyCastleTwo, enemyCastleThree, enemyCastleFour);
        allObstacles = [];
        allObstacles.push(rockCastleOne, rockCastleTwo, rockCastleThree, rockCastleFour);
        allItens = [];
        allItens.push(itemFive);
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

// MODAL DA HISTORIA
$("#modalHistory").on("click", function(e){
    $('.modalHistory').css("display", "block");  
});

$("#close").on("click", function(e){
    $('.modalHistory').css("display", "none"); 
});

// CRIANDO OBJETOS
const player = new Player(200, 460);

// INIMIGOS
let allEnemies = [];
const enemiesDesert = ['troll-worker', 'troll-man', 'troll-woman'];
const enemiesForest = ['troll-warrior', 'troll-ancient', 'troll-woman'];
const enemiesCastle = ['silver-warrior', 'bronze-warrior', 'gold-warrior'];

// INIMIGOS DO NIVEL 1
let enemyDesertOne = new Enemy(-80, 60, 60, 80, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);
let enemyDesertTwo  = new Enemy(-80, 140, 140, 180, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);
let enemyDesertThree  = new Enemy(-80, 220, 220, 60, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);
let enemyDesertFour  = new Enemy(-80, 300, 300, 140, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);

// INIMIGOS DO NIVEL 2
let enemyDirtOne = new Enemy(-80, 60, 60, 80, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);
let enemyDirtTwo  = new Enemy(-80, 140, 140, 180, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);
let enemyDirtThree  = new Enemy(-80, 220, 220, 60, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);
let enemyDirtFour  = new Enemy(-80, 300, 300, 140, enemiesDesert[Math.floor(enemiesDesert.length*Math.random())]);

// INIMIGOS DO NIVEL 3
let enemyForestOne = new Enemy(-80, 60, 60, 60, enemiesForest[Math.floor(enemiesForest.length*Math.random())]);
let enemyForestTwo = new Enemy(-80, 140, 140, 190, enemiesForest[Math.floor(enemiesForest.length*Math.random())]);
let enemyForestThree = new Enemy(-80, 220, 220, 80, enemiesForest[Math.floor(enemiesForest.length*Math.random())]);
let enemyForestFour = new Enemy(-80, 300, 300, Math.random() * (200 - 140) + 140, enemiesForest[Math.floor(enemiesForest.length*Math.random())]);

// INIMIGOS DO NIVEL 4
let enemyDoorsOne = new Enemy(-80, 60, 60, 200, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);
let enemyDoorsTwo = new Enemy(-80, 140, 140, Math.random() * (200 - 110) + 110, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);
let enemyDoorsThree = new Enemy(-80, 220, 220, 60, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);
let enemyDoorsFour = new Enemy(-80, 300, 300, Math.random() * (200 - 110) + 110, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);

// INIMIGOS DO NIVEL 5
let enemyCastleOne = new Enemy(-80, 60, 60, 200, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);
let enemyCastleTwo = new Enemy(-80, 140, 140, Math.random() * (200 - 110) + 110, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);
let enemyCastleThree = new Enemy(-80, 220, 220, 60, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);
let enemyCastleFour = new Enemy(-80, 300, 300, Math.random() * (200 - 110) + 110, enemiesCastle[Math.floor(enemiesCastle.length*Math.random())]);

allEnemies.push(enemyDesertOne, enemyDesertTwo, enemyDesertThree, enemyDesertFour);

// OBSTACULOS
let allObstacles = [];
let rockDirtOne = new Obstacle(Math.floor(Math.random() * (4 - 0)) * 100, 380, 90, 60, 'images/scenario/rock.png');
let rockDirtTwo = new Obstacle(Math.floor(Math.random() * (4 - 0)) * 100, 300, 90, 60, 'images/scenario/rock.png');
let rockDirtThree = new Obstacle(Math.floor(Math.random() * (4 - 0)) * 100, 140, 90, 60, 'images/scenario/rock.png');

let wallOne = new Obstacle(0, -20, 90, 60, 'images/scenario/wall-block.png');
let wallTwo = new Obstacle(100, -20, 90, 60, 'images/scenario/wall-block.png');
let wallThree = new Obstacle(302, -20, 90, 60, 'images/scenario/wall-block.png');
let wallFour = new Obstacle(405, -20, 90, 60, 'images/scenario/wall-block.png');

let rockDoorsOne = new Obstacle(Math.floor(Math.random() * (4 - 0)) * 100, 140, 90, 60, 'images/scenario/rock.png');
let rockDoorsTwo = new Obstacle(Math.floor(Math.random() * (4 - 0)) * 100, 140, 90, 60, 'images/scenario/rock.png');
let rockDoorsThree = new Obstacle(Math.floor(Math.random() * (4 - 0)) * 100, 220, 90, 60, 'images/scenario/rock.png');
let rockDoorsFour = new Obstacle(Math.floor(Math.random() * (4 - 0)) * 100, 300, 90, 60, 'images/scenario/rock.png');

let rockCastleOne = new Obstacle(Math.floor(Math.random() * (4 - 0)) * 100, 220, 90, 60, 'images/scenario/rock.png');
let rockCastleTwo = new Obstacle(Math.floor(Math.random() * (4 - 0)) * 100, 300, 90, 60, 'images/scenario/rock.png');
let rockCastleThree = new Obstacle(Math.floor(Math.random() * (4 - 0)) * 100, 300, 90, 60, 'images/scenario/rock.png');
let rockCastleFour = new Obstacle(Math.floor(Math.random() * (4 - 0)) * 100, 380, 90, 60, 'images/scenario/rock.png');

// ITENS
allItens = [];
let itemOne = new Item(Math.floor(Math.random() * (4 - 0)) * 100, 60, 90, 60, 'images/itens/item-cash.png', 150, 0);
let itemTwo = new Item(Math.floor(Math.random() * (4 - 0)) * 100, 220, 90, 60, 'images/itens/item-heart.png', 0, 1);
let itemThree = new Item(Math.floor(Math.random() * (4 - 0)) * 100, 60, 90, 60, 'images/itens/item-cash.png', 150, 0);
let itemFour = new Item(Math.floor(Math.random() * (4 - 0)) * 100, 60, 90, 60, 'images/itens/item-heart.png', 0, 1);
let itemFive = new Item(Math.floor(Math.random() * (4 - 0)) * 100, 220, 90, 60, 'images/itens/item-cash.png', 150, 0);

allItens.push(itemOne);