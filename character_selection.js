function selectCharacter(characterImage) {
    // Armazena a escolha do jogador no armazenamento local (localStorage)
    localStorage.setItem('selectedCharacter', characterImage);
    
    // Redireciona o jogador de volta à tela principal do jogo
    window.location.href = 'index.html'; // Substitua 'index.html' pelo nome do seu arquivo principal do jogo
}
