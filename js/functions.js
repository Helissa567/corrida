
let player = null;
let obstacles = [];
const laneWidth = 100; // Largura de cada pista
const roadWidth = 200;
let time = 100;
let timer = null;

btn_left.onclick = () => {movePlayer(0)};
btn_right.onclick = () => {movePlayer(laneWidth)};
btn_start.onclick = startGame;
btn_end.onclick = endGame;

document.body.onkeydown = function (e) {
  if(e.which == 37){ // Teclas direcionais
    movePlayer(0);
  } else if(e.which == 39){ // tecla direito
     movePlayer(laneWidth);
  }else if(e.which == 32){ // Barra de espaço
    startGame();
  } else if(e.which == 19){ // Botão de pause
    endGame();
  }
  
}
function startGame(){
  if(timer != null) endGame();
  field.innerHTML = ""; // Limpa a pista
  obstacles = [];
  time = 100; // Velocidade inicial (mais baixo = mais rápido)
   if (points) points.innerText = "0"; 
  // Cria o jogador (carro)
  player = newPiece(0, 320); 
  player.style.transition = "left 0.1s"; // Efeito suave de troca de pista
  
  timer = setInterval(loop, time);
}
// (Re)Inicia o timer do jogo e chama a função start()

function movePlayer(x) {
  if(player) player.style.left = x + "px";
}

function loop() {
    spawnObstacle();   // Esta linha deve existir aqui!
  moveObstacles();
  // 1. Criar novos obstáculos aleatoriamente
  if (Math.random() > 0.9) {
    let lane = Math.floor(Math.random() * 2) * laneWidth;
    
    let obs = newPiece(lane, -20);
    obstacles.push(obs);
  }

  // 2. Mover obstáculos para baixo
  for (let i = 0; i < obstacles.length; i++) {
    let obs = obstacles[i];
    let top = getPosition(obs, "top") + 10;
    obs.style.top = top + "px";

    // 3. Checar Colisão
    if (colision(player, obs)) {
      endGame();
      return;
    }

    // 4. Remover obstáculos que saíram da tela
    if (top > 320) {
      obs.remove();
      obstacles.splice(i, 1);
      i--;
    }
  }
}



function endGame(){
  clearInterval(timer);
  alert("Game Over! Você bateu o carro.");
  timer = null;
   if (points) points.innerText = "0";
  return true;
}

// Suas funções auxiliares permanecem iguais ou similares
function newPiece(left, top){
    let piece = document.createElement("div");
    piece.className = "piece";
    piece.style.left = left+"px";
    piece.style.top = top+"px";
    field.appendChild(piece);  
    return piece;
}

function getPosition(obj, direction){  
  return parseInt(obj.style[direction]);
}

function colision(objA, objB) {
  let aLeft = getPosition(objA, "left");
  let aTop = getPosition(objA, "top");
  let bLeft = getPosition(objB, "left");
  let bTop = getPosition(objB, "top");

  // Se estiverem na mesma pista E a distância vertical for menor que a altura do carro
  // Ajustamos para 100 ou 110 (a altura que você definiu no CSS)
  return (aLeft == bLeft && Math.abs(aTop - bTop) < 80); 
}



