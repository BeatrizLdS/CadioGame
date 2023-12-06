import { Running, Jumping, Falling, RunningDown, Rolling} from "./state.js";

export default class Player {
    constructor(gameWidth, gameHeight, groundHeight) {
        this.groundHeight = groundHeight;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [
            new Running(this), 
            new Jumping(this), 
            new Falling(this), 
            new RunningDown(this), 
            new Rolling(this)
        ];
        this.currentState = this.states[1];
        this.image = document.getElementById('sprites');
        this.spriteWidth = 100;
        this.spriteHeight = 100;
        this.x = this.gameWidth/12;
        this.defaultY = this.gameHeight - (2.8 * groundHeight);
        this.y = this.defaultY;
        this.velocityY = 0;
        this.weight = 0.5;
        this.frameX = 0;
        this.frameY = 0;
    }
    draw(context, groundHeight) {
        context.drawImage(this.image, 
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
            this.spriteWidth, this.spriteHeight, 
            this.x, this.y, 
            this.spriteWidth * 1.75, this.spriteHeight * 1.75);
    }
    update(control, input) {
        let staggerFrames = 5;
        let position = Math.floor(control/staggerFrames) % this.currentState.numberFrames;
        this.frameX = position;
        this.currentState.handleInput(input);
        this.y += this.velocityY;
        if (!this.onGround()) {
            this.velocityY += this.weight;
        } 
        else {
            this.velocityY = 0;
        }
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    onGround() {
        return this.y >= this.defaultY
    }
    finishedSlide() {
        console.log(this.frameX)
        return this.frameX == this.currentState.numberFrames - 1
    }
}