// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // Reset Enemy when off canvas
    if (this.x > 505) {
        this.x = -10;
        this.speed = 100 + Math.floor(Math.random() * 450);
    }

    // Check for collision
/*    if ((this.x - 20 < player.x) &&
        (this.x + 20 > player.x) &&
        (this.y + 70 > player.y) &&
        (this.y - 70 < player.y)) {
         console.log('player X: ' + player.x + ' this X: ' + this.x);
         console.log('player Y: ' + player.y + ' this Y: ' + this.y);
         player.x = 200;
         player.y = 400;
    }
*/
    if ((this.x - 50 < player.x) &&
       (this.x + 50 > player.x) &&
       (this.y + 40 > player.y -30) &&
       (this.y - 40 < player.y +30)) {
       console.log('player X: ' + player.x + ' this X: ' + this.x);
       console.log('player Y: ' + player.y + ' this Y: ' + this.y);
       player.x = 200;
       player.y = 400;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    //player can not be off the game board
    if(this.x < 0){
        this.x = 0;
    } else if(this.x > 400){
        this.x = 400;
    }
    if(this.y > 440){
        this.y = 440;
    } else if(this.y <= 0){
        this.y = 0;
    }

};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(whichKeyPressed){
    if(whichKeyPressed == 'left') {
        player.x -= player.speed;
        //console.log('left');
    }else if(whichKeyPressed == 'right') {
        player.x += player.speed;
        //console.log('right');
    }

    if(whichKeyPressed == 'up'){
        player.y -= player.speed + 05;
        console.log('up ' + player.y);
    }else if (whichKeyPressed == 'down') {
        player.y += player.speed - 05;
        console.log('down ' + player.y);
    }

    if(player.y <= 0){
        console.log(player.y);
        alert('You won!!');
        player = new Player(200, 400, 50);
        //reset();
    }
    //console.log(this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [new Enemy(-100, 60, 250), new Enemy(-100, 145, 250), new Enemy(-100, 230, 250)];
player = new Player(200, 400, 50);
//console.log(player);

// This listens for key presses and sends the keys to your
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
