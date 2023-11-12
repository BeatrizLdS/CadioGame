import Player from './player.js';
import InputHandler from './input.js';
import {drawStatustext} from './utils.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Recupera a escolha do jogador a partir do armazenamento local
    const selectedCharacter = localStorage.getItem('selectedCharacter');

    // Direcionamento das páginas
    if (selectedCharacter) {
        window.location.href = 'character_selection.html'; // Redireciona para a tela de seleção de personagem
    }

    const player = new Player(canvas.width, canvas.height, selectedCharacter);
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