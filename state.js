import {gameSpeed, updateGameSpeed} from './script.js';

export const states = {
    STANDING : 0,
    RUNNING : 1,
    STANDING_DOWN : 2,
    JUMPING : 3,
    FALLING : 4,
    RUNNING_DOWN : 5,
    ROLLING : 6,
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class Standing extends State {
    constructor(player) {
        super('STANDING');
        this.player = player;
        this.numberFrames = 7;
    }
    enter() {
        this.player.frameY = 0;
        this.player.weight = 0.5;
        updateGameSpeed(0);
    }
    handleInput(input) {
        if (input === 'PRESS right') this.player.setState(states.RUNNING);
        else if (input === 'PRESS down') this.player.setState(states.STANDING_DOWN);
    }
}

export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
        this.numberFrames = 9;
    }
    enter() {
        this.player.frameY = 3;
        updateGameSpeed(5);
        console.log(gameSpeed);
    }
    handleInput(input) {
        if (input === 'PRESS left') this.player.setState(states.STANDING);
        else if (input === 'PRESS down') this.player.setState(states.RUNNING_DOWN);
        else if (input === 'PRESS up') this.player.setState(states.JUMPING);
    }
}

export class StandingDown extends State {
    constructor(player) {
        super('STANDING DOWN');
        this.player = player;
        this.numberFrames = 5;
    }
    enter() {
        this.player.frameY = 5;
        updateGameSpeed(0);
    }
    handleInput(input) {
        if (input === 'PRESS up') this.player.setState(states.STANDING);
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
        this.numberFrames = 7;
    }
    enter() {
        this.player.frameY = 1;
        this.player.velocityY -= 20;
        updateGameSpeed(4);
        console.log(this.player.velocityY);
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
        this.numberFrames = 7;
    }
    enter() {
        this.player.frameY = 2;
        updateGameSpeed(4.5);
    }
    handleInput(input) {
        if (this.player.onGround()) this.player.setState(states.RUNNING);
    }
}

export class Rolling extends State {
    constructor(player) {
        super('ROLLING');
        this.player = player;
        this.numberFrames = 7;
    }
    enter() {
        this.player.frameY = 6;
        this.player.weight = 2;
        this.player.velocityY = 0;
        updateGameSpeed(7);
    }
    handleInput(input) {
        if (this.player.onGround()){
            this.player.weight = 0.5;
            this.player.setState(states.RUNNING);
        }
    }
}

export class RunningDown extends State {
    constructor(player) {
        super('RUNNING DOWN');
        this.player = player;
        this.numberFrames = 7;
    }
    enter() {
        this.player.frameY = 7;
        updateGameSpeed(4);
    }
    handleInput(input) {
    }
}