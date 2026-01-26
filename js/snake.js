
function start() {
  // Cria o jogador (carro) na pista da esquerda (0) e embaixo (340)
  player = newPiece(0, 320);
  player.id = "car";
  player.style.transition = "left 0.1s"; // Movimento lateral suave
  
  direction = 39; // Não controla mais o movimento contínuo, mas a pista
  obstacles = [];
}

function loop() {
  spawnObstacle();
  moveObstacles();
  // Se houver colisão ou sair da pista, o loop para
}

// 1. Em vez de mover para os 4 lados, o carro apenas troca de pista
function move() {
  // Chamada pelos botões ou teclado
  if (direction == 37) { // Esquerda
    player.style.left = "0px";
  } else if (direction == 39) { // Direita
    player.style.left = laneWidth + "px";
  }
}


function spawnObstacle() {
  const distanciaMinima = 200; // Espaço vertical entre obstáculos
  let ultimoObs = obstacles[obstacles.length - 1];

  // Se não houver obstáculos OU o último já desceu o suficiente
  if (!ultimoObs || getPosition(ultimoObs, "top") >= distanciaMinima) {
    
    // Escolhe uma pista aleatória
    let lane = Math.floor(Math.random() * 2) * laneWidth;
    
    // Cria o novo obstáculo
    let obs = newPiece(lane, -60);
    obs.classList.add("obstacle");
    obstacles.push(obs);
  }
}

// 3. Move os obstáculos para baixo e checa colisão
function moveObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    let obs = obstacles[i];
    let currentTop = getPosition(obs, "top");
    let newTop = currentTop + 10; // Velocidade da descida
    obs.style.top = newTop + "px";

    // Checa colisão com o jogador
    if (colision(player, obs)) {
      endGame();
      return;
    }

    // Remove obstáculos que saíram da tela para não pesar o jogo
    if (newTop > 400) {
        obs.remove();
      obstacles.splice(i, 1);
      i--;
      
      // Ganha pontos ao desviar
      points.innerText = parseInt(points.innerText || 0) + 1;
        
      if (time > 30) { // Define um limite (ex: 30ms) para o jogo não ficar impossível
    clearInterval(timer);
    time -= 2; // Diminui o intervalo em 2 milissegundos a cada ponto
    timer = setInterval(loop, time);
  }
    }
  }
}

// Substitui a checagem de parede e auto-colisão da cobra
function gameOver() {
  // Na corrida, a colisão é tratada dentro do moveObstacles
  // Mas podemos checar se o carro saiu dos limites se desejar
}

