import InputHandler from './input.js';
import {drawStatustext} from './utils.js';
import Game from './Game.js';

let canvas;
let context;
let game;
const input = new InputHandler();

export function updateSpeed(speed) {
    game.updateSpeed(speed);
}

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    game.draw(context);
    game.update(input);

    requestAnimationFrame(animate);
};

function setupGame() {
    canvas = document.getElementById('canvas1');
    context = canvas.getContext('2d');
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    game = new Game(canvas.width, canvas.height);
    game.createPlayer('NomeDaImagem');
    game.createLayers();
  
    animate();
  }

window.addEventListener('load', setupGame);

// window.addEventListener('resize', setupGame);
