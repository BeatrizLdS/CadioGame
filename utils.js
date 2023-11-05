export function drawStatustext(context, input, player) {
    context.font = '25px Helvetica';
    context.fillText('Last input:' + input.lastKey, 20, 50);
    context.fillText('Active State:' + player.currentState.state, 20, 100);
}