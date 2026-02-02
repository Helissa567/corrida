
function start() {
  player = newPiece(0, 320);
  player.id = "car";
  player.style.transition = "left 0.1s"; 
  
  direction = 39; 
  obstacles = [];
}

function loop() {
  spawnObstacle();
  moveObstacles();
}

function move() {
  if (direction == 37) { // Esquerda
    player.style.left = "0px";
  } else if (direction == 39) { // Direita
    player.style.left = laneWidth + "px";
  }
}


function spawnObstacle() {
  const distanciaMinima = 200; 
  let ultimoObs = obstacles[obstacles.length - 1];

  if (!ultimoObs || getPosition(ultimoObs, "top") >= distanciaMinima) {
    
    let lane = Math.floor(Math.random() * 2) * laneWidth;
    
    let obs = newPiece(lane, -60);
    obs.classList.add("obstacle");
    obstacles.push(obs);
  }
}

function moveObstacles() {
  for (let i = 0; i < obstacles.length; i++) {
    let obs = obstacles[i];
    let currentTop = getPosition(obs, "top");
    let newTop = currentTop + 10; 
    obs.style.top = newTop + "px";

    if (colision(player, obs)) {
      endGame();
      return;
    }

    if (newTop > 400) {
        obs.remove();
      obstacles.splice(i, 1);
      i--;
      
      // Ganha pontos ao desviar
      points.innerText = parseInt(points.innerText || 0) + 1;
        
      if (time > 30) {
    clearInterval(timer);
    time -= 2; 
    timer = setInterval(loop, time);
  }
    }
  }
}


