import Player from './player.js';
import InputHandler from './input.js';
import {drawStatustext} from './utils.js';
import Layer from './background.js';

export let gameSpeed = 0;
let gameObjects = [];
let context;

export function updateGameSpeed(speed) {
    gameSpeed = speed;
    gameObjects.forEach(object => {
        object.speed = gameSpeed;
        object.draw(context);
    })
}

function setupGame() {
    const canvas = document.getElementById('canvas1');
    context = canvas.getContext('2d');
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const input = new InputHandler();
    let control = 0;
  
    let ground = new Layer(
      canvas.width, canvas.height,
      'ground.png', gameSpeed,
      0, canvas.height - 90,
      canvas.width, 90
    );
  
    let groundStatic = new Layer(
        canvas.width, canvas.height,
        'ground.png', 0,
        0, canvas.height - 90,
        canvas.width, 90
      );

    let sky = new Layer(
      canvas.width, canvas.height,
      'sky.png', gameSpeed / 5,
      canvas.width / 6, 0,
      1000, 500
    );
  
    gameObjects = [ground, sky];
  
    const player = new Player(canvas.width, canvas.height, 90);
  
    function animate() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      control++;
  
      groundStatic.draw(context);
      groundStatic.update();

      gameObjects.forEach(object => {
        object.draw(context);
        object.update();
      })
  
      player.update(control, input.lastKey);
      player.draw(context);
  
      requestAnimationFrame(animate);
    };
  
    animate();
  }

window.addEventListener('load', setupGame);

// window.addEventListener('resize', setupGame);
