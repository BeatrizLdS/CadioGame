import Player from './player.js';
import InputHandler from './input.js';
import {drawStatustext} from './utils.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const player = new Player(canvas.width, canvas.height);
    const input = new InputHandler();
    let control = 0;

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        control++;
        drawStatustext(context, input, player);
        player.update(control, input.lastKey);
        player.draw(context);
        requestAnimationFrame(animate);
    };
    animate();
});

window.addEventListener('resize', function() {
    const canvas = document.getElementById('canvas1');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const player = new Player(canvas.width, canvas.height);
    const input = new InputHandler();
    let control = 0;

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        control++;
        drawStatustext(context, input, player);
        player.update(control, input.lastKey);
        player.draw(context);
        requestAnimationFrame(animate);
    };
    animate();
});

// const canvas = document.getElementById('canvas1');
// const context = canvas.getContext('2d');

// const CANVAS_WIDTH = canvas.width = window.innerWidth;
// const CANVAS_HEIGHT = canvas.height = window.innerHeight;

// const playerImage = new Image();
// playerImage.src = "shadow_dog.png";

// const spriteWidth = 575;
// const spriteHeight = 523;
// let control = 0;
// const staggerFrames = 5;

// const spriteAnimations = {};
// const animationStates = [
//     {
//         name: 'idle',
//         frames: 7,
//     },
//     {
//         name: 'jump',
//         frames: 7,
//     },
//     {
//         name: 'fall',
//         frames: 9,
//     },
//     {
//         name: 'run',
//         frames: 9,
//     },
//     {
//         name: 'dizzy',
//         frames: 11,
//     },
//     {
//         name: 'sit',
//         frames: 5,
//     },
//     {
//         name: 'roll',
//         frames: 7,
//     },
//     {
//         name: 'ko',
//         frames: 12,
//     },
//     {
//         name: 'getHit',
//         frames: 4,
//     }
// ];
// animationStates.forEach((state, index) => {
//     let frames = {
//         locations: [],
//     }
//     for (let j = 0; j < state.frames; j++) {
//         let positionX = j * spriteWidth;
//         let positionY = index * spriteHeight;
//         frames.locations.push({x: positionX, y: positionY});
//     }
//     spriteAnimations[state.name] = frames;
// });

// let animation = spriteAnimations['idle'];

// document.addEventListener('keydown', (event) => {
//     console.log('Tecla pressionada:', event.key);
//     if (event.key == "ArrowUp") animation = spriteAnimations['jump'];
//     if (event.key == "ArrowDown") animation = spriteAnimations['sit'];
//     if (event.key == "ArrowRight") animation = spriteAnimations['run'];
//     if (event.key == "ArrowLeft") animation = spriteAnimations['idle'];
// });

// function animate2() {
//     context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
//     control ++;

//     let position = Math.floor(control/staggerFrames) % animation.locations.length;
//     let frameX = animation.locations[position].x;
//     let frameY = animation.locations[position].y;

//     context.drawImage(
//         playerImage, 
//         frameX, frameY, 
//         spriteWidth, spriteHeight, 
//         0, 0, 
//         spriteWidth, spriteHeight);
//     requestAnimationFrame(animate);
// };

// animate();