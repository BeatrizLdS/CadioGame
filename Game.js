import Player from './player.js';
import Layer from './Layer.js';
import Food from './Food.js';

export default class Game {
    #control = 0;
    #timeIntervalForFood = 200;
    #timeLastFood = 0;

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.groundStatic;
        this.foods = [];
        this.layers = [];
        this.player;
        this.speed = 3;

        this.score = 0;
    }

    restartGame() {
        this.player.restart();
        this.foods = [];
        this.score = 0;
    }

    isGameOver() {
        if (this.score < 0) return true;
        return false;
    }

    checkCollisions() {
        // Obtém as coordenadas do jogador
        const playerX = this.player.colisionX;
        const playerY = this.player.y + this.player.colisionFix;
        const playerWidth = this.player.colisionWidth;
        const playerHeight = this.player.colisionHeight;
    
        // Verifica colisões com cada alimento
        for (let i = this.foods.length - 1; i >= 0; i--) {
            const food = this.foods[i];
    
            console.log(food.collisionFix);
            // Obtém as coordenadas do alimento
            const foodX = food.x + food.collisionFix;
            const foodY = food.y + food.collisionFix;
            const foodWidth = food.collisionDimension;
            const foodHeight = food.collisionDimension;

            // Verifica se houve colisão
            if (
                playerX < foodX + foodWidth &&
                playerX + playerWidth > foodX &&
                playerY < foodY + foodHeight &&
                playerY + playerHeight > foodY
            ) {
                if (food.foodType == 'good') this.collisionWithGoodFood(food);
                else if (food.foodType == 'bad') this.collisionWithBadFood(food);
            }
        }
    }

    collisionWithGoodFood(food) {
        food.markedForDelection = true;
        this.score += 3;
    }

    collisionWithBadFood(food) {
        food.markedForDelection = true;
        this.score -= 1;
    }

    update(input) {
        if (!this.isGameOver()) this.updateGaming(input);
        else {
            if ((input.lastKey == "Enter") || (input.lastKey == "Click")) this.restartGame();
        }
    }

    updateGaming(input) {
        if ( this.#timeLastFood >= this.#timeIntervalForFood ) {
            this.#addNewEnemy();
            this.#timeLastFood = 0
        } else {
            this.#timeLastFood++;
        }

        this.#control++;

        this.layers.forEach( layer => {
            layer.update();
        })

        this.#removeMarkedFoods();
        this.foods.forEach( food => {
            food.update();
        })

        this.player.update(this.#control, input.lastKey);

        this.checkCollisions();
    }

    draw(context) { 
        if (this.isGameOver()) this.drawGameOver(context);
        else this.drawGaming(context);
    }

    drawGameOver(context) {
        context.fillStyle = "#C30100";
        context.fillRect(0, 0, this.gameWidth, this.gameHeight);

        let widthText = this.gameWidth/2.5;
        let heightText = this.gameHeight/2;
        let imageText = document.getElementById('gameOverText');
        context.drawImage(imageText, 
            (this.gameWidth/2) - (widthText/2), 
            (this.gameHeight/3) - (heightText/2), 
            widthText, heightText);

        
        let widthButton = this.gameWidth/8;
        let heightButton = this.gameHeight/10;
        let imageButton = document.getElementById('gameOverButton');
        context.drawImage(imageButton, 
            (this.gameWidth/2) - (widthButton/2), 
            (this.gameHeight/3) + (heightText/1.5),
            widthButton, heightButton);
        
    }

    drawGaming(context) {
        this.groundStatic.draw(context);

        this.layers.forEach( layer => {
            layer.draw(context);
        })

        this.foods.forEach( food => {
            food.draw(context);
            //food.drawCollisionArea(context);
        })

        this.drawScore(context);

        this.player.draw(context);
        //this.player.drawCollisionArea(context);
    }

    drawScore(context) {
        let image = document.getElementById('coin');
        context.drawImage(image, 20, 15, 60, 60);

        context.font = '40px Helvica';

        context.fillStyle = 'black';
        context.fillText(this.score, 80, 60);
    }

    createLayers() {
        let ground = new Layer(
            this.gameWidth, this.gameHeight,
            './Resources/Layer/ground.png', this.speed,
            0, this.gameHeight - 90,
            this.gameWidth, 90
        );
        
        let groundStatic = new Layer(
            this.gameWidth, this.gameHeight,
            './Resources/Layer/ground.png', 0,
            0, this.gameHeight - 90,
            this.gameWidth, 90
        );
      
        let sky = new Layer(
            this.gameWidth, this.gameHeight,
            './Resources/Layer/sky.png', this.speed / 5,
            this.gameWidth / 6, 0,
            1000, 500
        );

        this.groundStatic = groundStatic;
        this.layers = [sky, ground];
    }

    createPlayer(playerName) {
        this.player = new Player( 
            this.gameWidth, 
            this.gameHeight, 
            90
        );
    }

    updateSpeed(newSpeed) {
        this.speed = newSpeed;
        this.layers.forEach ( layer => {
            layer.speed = this.speed;
        })
    }

    #addNewEnemy() {
        var heights = [0, 1, 2];
        var currentheight = heights[Math.floor(Math.random() * heights.length)];

        this.foods.push(new Food(this.gameWidth, 
            this.gameHeight - ( (2.5 + currentheight) * this.groundStatic.height), 
            5
            ));
    }

    #removeMarkedFoods() {
        let toRemove = this.foods.filter( food => food.markedForDelection );

        // Iterar sobre o array 'toRemove'
        for(let i = 0; i < toRemove.length; i++) {
            // Encontrar o índice do elemento no array 'foods'
            let index = this.foods.indexOf(toRemove[i]);
            
            // Remover o elemento do array 'foods'
            if(index !== -1) {
                this.foods.splice(index, 1);
            }
        }
    }
}