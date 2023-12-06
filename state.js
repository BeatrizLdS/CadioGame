import {updateSpeed} from './script.js';

export const states = {
    RUNNING : 0,
    JUMPING : 1,
    FALLING : 2,
    RUNNING_DOWN : 3,
    ROLLING : 4,
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
        this.numberFrames = 8;
    }
    enter() {
        this.player.frameY = 2;
        this.player.y = this.player.defaultY;
        updateSpeed(5);
    }
    handleInput(input) {
        if (input === 'PRESS down') this.player.setState(states.RUNNING_DOWN);
        else if (input === 'PRESS up') this.player.setState(states.JUMPING);
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
        this.numberFrames = 4;
    }
    enter() {
        this.player.frameY = 0;
        this.player.velocityY -= 20;
        updateSpeed(4);
    }
    handleInput(input) {
        if (input === 'PRESS down') this.player.setState(states.ROLLING);
        else if (this.player.velocityY == 0) this.player.setState(states.FALLING);
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
        this.numberFrames = 4;
    }
    enter() {
        this.player.frameY = 1;
        updateSpeed(4.5);
    }
    handleInput(input) {
        if (this.player.onGround()) {
            
            this.player.setState(states.RUNNING);
        }
        else if (input == "PRESS down") this.player.setState(states.ROLLING);
    }
}

export class RunningDown extends State {
    constructor(player) {
        super('SLIDING');
        this.player = player;
        this.numberFrames = 8;
    }
    enter() {
        this.player.frameY = 3;
        updateSpeed(4);
    }
    handleInput(input) {
        if (this.player.finishedSlide()) this.player.setState(states.RUNNING);
        else if (input == "PRESS up") this.player.setState(states.JUMPING);
    }
}

export class Rolling extends State {
    constructor(player) {
        super('ROLLING');
        this.player = player;
        this.numberFrames = 4;
    }
    enter() {
        this.player.frameY = 1;
        this.player.weight = 2;
        this.player.velocityY = 0;
        // updateSpeed(7);
    }
    handleInput(input) {
        if (this.player.onGround()){
            this.player.weight = 0.5;
            this.player.setState(states.RUNNING);
        }
    }
}

