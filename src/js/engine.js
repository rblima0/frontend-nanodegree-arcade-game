/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        // FIM DE JOGO
        if (player.lives === 0) {
            player.gameOver = true;
            allEnemies = [];
            allItens = [];
            ctx.font = 'bold 14pt Calibri';
            ctx.globalAlpha = 0.80;
            ctx.fillStyle = 'black';
            ctx.fillRect(70, 200, 350, 200);
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'white';
            ctx.fillText('SUAS VIDAS ACABARAM', 150, 270);
            ctx.fillText('VOCÊ NÃO SALVOU A RAINHA', 130, 295);
            ctx.font = 'italic 12pt Calibri';
            ctx.fillStyle = 'white';
            ctx.fillText('Aperte ENTER para tentar novamente', 117, 340);
        }

        if(player.level == 5) {
            ctx.drawImage(Resources.get('images/itens/key.png'), 200, -20);
        } else if(player.level == 6){
            allEnemies = [];
            allObstacles = [];
            allItens = [];
            ctx.drawImage(Resources.get('images/itens/chest-close.png'), 200, 50);
            ctx.drawImage(Resources.get('images/itens/key.png'), player.x, player.y - 50);

            if((player.x >= 100 && player.x <= 300) && (player.y <= 140)) {
                ctx.drawImage(Resources.get('images/itens/chest-open.png'), 200, 50);
                ctx.drawImage(Resources.get('images/character/queen-down.png'), 200, 50);

                ctx.font = 'bold 14pt Calibri';
                ctx.globalAlpha = 0.80;
                ctx.fillStyle = 'green';
                ctx.fillRect(70, 250, 350, 200);
                ctx.globalAlpha = 1;
                ctx.fillStyle = 'white';
                ctx.fillText('PÁRABENS', 200, 330);
                ctx.fillText('VOCÊ CONSEGUIU SALVAR A RAINHA', 100, 355);
                ctx.font = 'italic 12pt Calibri';
                ctx.fillStyle = 'white';
                ctx.fillText('Aperte ENTER para jogar novamente', 117, 390);
                player.winner = true;
            }
        }
        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [];

        // NIVEL 1 DESERTO - NIVEL 2 FLORESTA - NIVEL 3 CASTELO
        if(player.level == 1) {
            rowImages = [
                'images/scenario/dirt-block.png',
                'images/scenario/dirt-block.png',
                'images/scenario/dirt-block.png',
                'images/scenario/dirt-block.png',
                'images/scenario/desert-block.png', 
                'images/scenario/desert-block.png' 
            ]
        } else if(player.level == 2){
            rowImages = [
                'images/scenario/grass-forest-block.png',
                'images/scenario/grass-block.png',
                'images/scenario/dirt-block.png',
                'images/scenario/dirt-block.png',
                'images/scenario/dirt-block.png',
                'images/scenario/dirt-block.png'
            ]           
        } else if(player.level == 3) {
            rowImages = [
                'images/scenario/plain-block.png',
                'images/scenario/grass-block.png',
                'images/scenario/grass-block.png',
                'images/scenario/grass-block.png',
                'images/scenario/grass-block.png',
                'images/scenario/grass-forest-block.png'
            ]
        } else if(player.level == 4) {
            rowImages = [
                'images/scenario/stone-block.png',
                'images/scenario/stone-block.png',
                'images/scenario/stone-block.png',
                'images/scenario/stone-block.png',
                'images/scenario/stone-block.png',
                'images/scenario/plain-block.png'
            ]
        } else if(player.level == 5) {
            rowImages = [
                'images/scenario/wood-block.png',
                'images/scenario/wood-block.png',
                'images/scenario/stone-block.png',
                'images/scenario/stone-block.png',
                'images/scenario/stone-block.png',
                'images/scenario/stone-block.png'
            ]
        } else if(player.level == 6) {
            rowImages = [
                'images/scenario/wood-block.png',
                'images/scenario/wood-block.png',
                'images/scenario/wood-block.png',
                'images/scenario/wood-block.png',
                'images/scenario/wood-block.png',
                'images/scenario/wood-block.png'
            ]
        }

        var numRows = 6,
            numCols = 5,
            row, col;
        
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        for (var i = 0; i < allObstacles.length; i++) {
            ctx.drawImage(Resources.get(allObstacles[i].sprite), allObstacles[i].left, allObstacles[i].top);
        }

        for (var i = 0; i < allItens.length; i++) {
            ctx.drawImage(Resources.get(allItens[i].sprite), allItens[i].left, allItens[i].top);
        }

        renderEntities();

        // INFORMAÇÕES NA TELA
        ctx.font = '14pt Arial';
        ctx.strokeStyle = 'black';

        ctx.drawImage(Resources.get('images/itens/life.png'), 10, 550);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.lineWidth = 2;
        ctx.strokeText('x', 50, 570);
        ctx.strokeText(player.lives, 65, 570);
        ctx.fillText('x', 50, 570);
        ctx.fillText(player.lives, 65, 570);

        ctx.drawImage(Resources.get('images/itens/money.png'), 410, 60);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.lineWidth = 2;
        ctx.strokeText(':', 445, 80);
        ctx.strokeText(player.progress, 450, 82);
        ctx.fillText(':', 445, 80);
        ctx.fillText(player.progress, 450, 82);
        
        ctx.drawImage(Resources.get('images/itens/progress.png'), 440, 550);
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.lineWidth = 2;
        ctx.strokeText(':', 475, 570);
        ctx.strokeText(player.level, 485, 571);
        ctx.fillText(':', 475, 570);
        ctx.fillText(player.level, 485, 571);
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }

    document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };

        if (e.keyCode == 13) {
            if (player.gameOver === true) {
                player.x = 200;
                player.y = 460;
                player.collid = false;
                player.lives = 3;
                player.level = 1;
                player.gameOver = false;
                player.progress = 0;
                allEnemies.push(enemyDirtOne, enemyDirtTwo, enemyDirtThree, enemyDirtFour);
                allObstacles = [];
            } else if(player.winner === true) {
                location.reload();
            }
        }
    
        player.handleInput(allowedKeys[e.keyCode]);
    });

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        //CENARIO
        'images/scenario/wall-block.png',
        'images/scenario/wood-block.png',
        'images/scenario/desert-block.png',
        'images/scenario/dirt-block.png',
        'images/scenario/plain-block.png',
        'images/scenario/stone-block.png',
        'images/scenario/grass-block.png',
        'images/scenario/grass-forest-block.png',
        'images/scenario/rock.png',
        // ITENS
        'images/itens/key.png',
        'images/itens/chest-open.png',
        'images/itens/chest-close.png',
        'images/itens/life.png',
        'images/itens/progress.png',
        'images/itens/money.png',
        'images/itens/item-cash.png',
        'images/itens/item-heart.png',
        'images/itens/empty.png',

        //INIMIGOS
        'images/enemies/troll-man-1.png',
        'images/enemies/troll-man-2.png',
        'images/enemies/troll-man-3.png',
        'images/enemies/troll-man-4.png',
        'images/enemies/troll-man-5.png',
        'images/enemies/troll-man-6.png',
        'images/enemies/troll-man-7.png',

        'images/enemies/troll-woman-1.png',
        'images/enemies/troll-woman-2.png',
        'images/enemies/troll-woman-3.png',
        'images/enemies/troll-woman-4.png',
        'images/enemies/troll-woman-5.png',
        'images/enemies/troll-woman-6.png',
        'images/enemies/troll-woman-7.png',

        'images/enemies/troll-ancient-1.png',
        'images/enemies/troll-ancient-2.png',
        'images/enemies/troll-ancient-3.png',
        'images/enemies/troll-ancient-4.png',
        'images/enemies/troll-ancient-5.png',
        'images/enemies/troll-ancient-6.png',
        'images/enemies/troll-ancient-7.png',

        'images/enemies/troll-warrior-1.png',
        'images/enemies/troll-warrior-2.png',
        'images/enemies/troll-warrior-3.png',
        'images/enemies/troll-warrior-4.png',
        'images/enemies/troll-warrior-5.png',
        'images/enemies/troll-warrior-6.png',
        'images/enemies/troll-warrior-7.png',

        'images/enemies/troll-worker-1.png',
        'images/enemies/troll-worker-2.png',
        'images/enemies/troll-worker-3.png',
        'images/enemies/troll-worker-4.png',
        'images/enemies/troll-worker-5.png',
        'images/enemies/troll-worker-6.png',
        'images/enemies/troll-worker-7.png',

        'images/enemies/silver-warrior-1.png',
        'images/enemies/silver-warrior-2.png',
        'images/enemies/silver-warrior-3.png',
        'images/enemies/silver-warrior-4.png',
        'images/enemies/silver-warrior-5.png',
        'images/enemies/silver-warrior-6.png',
        'images/enemies/silver-warrior-7.png',

        'images/enemies/bronze-warrior-1.png',
        'images/enemies/bronze-warrior-2.png',
        'images/enemies/bronze-warrior-3.png',
        'images/enemies/bronze-warrior-4.png',
        'images/enemies/bronze-warrior-5.png',
        'images/enemies/bronze-warrior-6.png',
        'images/enemies/bronze-warrior-7.png',

        'images/enemies/gold-warrior-1.png',
        'images/enemies/gold-warrior-2.png',
        'images/enemies/gold-warrior-3.png',
        'images/enemies/gold-warrior-4.png',
        'images/enemies/gold-warrior-5.png',
        'images/enemies/gold-warrior-6.png',
        'images/enemies/gold-warrior-7.png',

        // GUERREIRO
        'images/character/boy-down.png',
        'images/character/boy-up.png',
        'images/character/boy-left.png',
        'images/character/boy-right.png',
        // GUERREIRA
        'images/character/girl-down.png',
        'images/character/girl-up.png',
        'images/character/girl-left.png',
        'images/character/girl-right.png',
        // REI
        'images/character/king-down.png',
        'images/character/king-up.png',
        'images/character/king-left.png',
        'images/character/king-right.png',
        // RAINHA
        'images/character/queen-down.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
