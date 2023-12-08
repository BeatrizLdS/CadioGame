import Player from './player.js';
import Layer from './Layer.js';
import Food from './Food.js';
import Challenge from  './Challenge.js';
import { updateSpeed } from './script.js';

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
        this.speed = 5;

        this.score = 10;

        this.currentChallengeType = 1;
        this.challengeActivity = false;
    }

    restartGame() {
        this.player.restart();
        this.foods = [];
        this.score = 0;
        this.speed = 5;
        this.currentChallengeType = 0;
        this.challengeActivity = false;
    }

    isGameOver() {
        if (this.score < 0) return true;
        return false;
    }

    isGameWin() {
        if (this.score > 20) return true;
        return false;
    }

    isChallengeTime() {
        if (this.score > 0 && this.score < 20) {
            if ((this.score > 4 && this.score < 10) && (this.currentChallengeType == 0 || this.challengeActivity)) {
                if (this.currentChallengeType == 0) {
                    this.currentChallengeType = 1;
                    this.challengeActivity = true;
                    this.createChallenge(this.currentChallengeType);
                }
                return true
            }
            if ((this.score > 9 && this.score < 15) && (this.currentChallengeType == 1 || this.challengeActivity)) {
                if (this.currentChallengeType == 1) {
                    this.currentChallengeType = 2;
                    this.challengeActivity = true;
                    this.createChallenge(this.currentChallengeType);
                }
                return true
            }
        }
        return false
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
        if (this.isGameOver()) this.updateGameOver(input);
        else if (this.isGameWin()) this.updateGameWin(input);
        else if (this.isChallengeTime()) this.challenge.update(input, this);
        else this.updateGaming(input);
    }

    updateGameOver(input) {
        if ((input.lastKey == "Enter") || (input.lastKey == "Click")) {
            this.restartGame();
            input.lastKey = "";
        }
    }

    updateGameWin(input) {
        if ((input.lastKey == "Enter") || (input.lastKey == "Click")) {
            this.restartGame();
            input.lastKey = "";
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
        else if (this.isGameWin()) this.drawGameWin(context);
        else if (this.isChallengeTime()) this.challenge.draw(context);
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

    drawGameWin(context) {
        let image = document.getElementById('gameWin');
        context.drawImage(image, 
            0, 0, 
            this.gameWidth, this.gameHeight);
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

    createChallenge(type) {
        this.challenge = new Challenge(
            type, 
            this.gameWidth, this.gameHeight
        );
    }

    updateSpeed(newSpeed) {
        this.speed = newSpeed;
        this.layers.forEach ( layer => {
            layer.speed = this.speed;
        })
        this.foods.forEach ( food => {
            food.velocity = this.speed
        })
    }

    #addNewEnemy() {
        var heights = [0, 1, 2];
        var currentheight = heights[Math.floor(Math.random() * heights.length)];

        this.foods.push(new Food(this.gameWidth, 
            this.gameHeight - ( (2.5 + currentheight) * this.groundStatic.height), 
            this.speed
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