
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
  if(e.which == 37){ // Teclas esquerdo
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
  time = 100; // Velocidade inicial
   if (points) points.innerText = "0"; 
  player = newPiece(0, 320); 
  player.style.transition = "left 0.1s"; 
  
  timer = setInterval(loop, time);
}

function movePlayer(x) {
  if(player) player.style.left = x + "px";
}

function loop() {
  spawnObstacle();   
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

  return (aLeft == bLeft && Math.abs(aTop - bTop) < 80); 
}



