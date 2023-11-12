import Player from './player.js';
import InputHandler from './input.js';
import {drawStatustext} from './utils.js';
import Background from './background.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const player = new Player(canvas.width, canvas.height);
    const input = new InputHandler();
    let control = 0;

    const background = new Background(canvas.width, canvas.height);

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        control++;
        drawStatustext(context, input, player);
        player.update(control, input.lastKey);
        player.draw(context);

        background.draw(context);
        background.update();

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