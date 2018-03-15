// Inimigos que nosso jogador deve evitar
var Enemy = function() {
    // As variáveis aplicadas a cada uma das nossas instâncias vão aqui,
    // nós fornecemos um para você começar

    // A imagem / sprite para os nossos inimigos, isso usa
    // um ajudante que fornecemos para carregar facilmente imagens
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Você deve multiplicar qualquer movimento pelo parâmetro dt
    // que assegurará que o jogo seja executado na mesma velocidade para
    // todos os computadores.
};

// Desenhe o inimigo na tela, método necessário para o jogo
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Agora escreva sua própria classe de jogador
// This class requires an update(), render() and
// a handleInput() method.


// Agora instancie seus objetos.
// Coloque todos os objetos inimigos em uma matriz chamada allEnemies
// Coloque o objeto do jogador em uma variável chamada player



//  Isso escuta pressionamentos de teclas e envia as chaves para o seu
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
