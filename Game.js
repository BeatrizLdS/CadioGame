import Player from './player.js';
import Layer from './Layer.js';
import Food from './Food.js';

export default class Game {
    #control = 0;
    #timeIntervalForFood = 400;
    #timeLastFood = 0;

    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.groundStatic;
        this.foods = [];
        this.layers = [];
        this.player;
        this.speed = 3;
    }

    update(input) {
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

        this.foods.forEach( food => {
            food.update();
        })

        this.player.update(this.#control, input.lastKey);
        console.log(this.player.currentState);
    }

    draw(context) { 
        this.groundStatic.draw(context);

        this.layers.forEach( layer => {
            layer.draw(context);
        })

        this.foods.forEach( food => {
            food.draw(context);
        })

        this.player.draw(context);
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
        this.foods.push(new Food(this.gameWidth, 90));
    }
}