import { Standing, Running, StandingDown, Jumping, Falling, RunningDown, Rolling} from "./state.js";

export default class Player {
    constructor(gameWidth, gameHeight, selectedCharacter) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.states = [
            new Standing(this), 
            new Running(this), 
            new StandingDown(this), 
            new Jumping(this), 
            new Falling(this), 
            new RunningDown(this), 
            new Rolling(this)
        ];
        this.currentState = this.states[0];

        // define sprite
        this.image = document.getElementById(selectedCharacter);
        this.spriteWidth = 575;
        this.spriteHeight = 523;
        
        this.x = this.gameWidth/2 - this.spriteWidth/8;
        this.y = this.gameHeight - this.spriteHeight/2;
        this.velocityY = 0;
        this.weight = 0.5;
        this.frameX = 0;
        this.frameY = 0;
    }
    draw(context) {
        context.drawImage(this.image, 
            this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, 
            this.spriteWidth, this.spriteHeight, 
            this.x, this.y, 
            this.spriteWidth/4, this.spriteHeight/4);
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
        return this.y >= this.gameHeight - this.spriteHeight/2
    }
    finishedSlide() {
        console.log(this.frameX)
        return this.frameX == this.currentState.numberFrames - 1
    }
}