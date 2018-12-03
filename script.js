let gameSettings = {
  player1: null,
  player2: null,
  rounds: 0,
}

let gameInterval;
let player1Score ;
let player2Score;
let drawsScore;
let cycleCounter = 0;
let rounds
const player1Board = document.getElementById("player1-score");
const player2Board = document.getElementById("player2-score");
const drawsBoard = document.getElementById("draws-score");
const roundsLeft = document.getElementById("rounds");

const types = {
  'human': {
    name: "Human",
  },
  'random': {
    name: "Random",
    move: () => {
      return Math.round(Math.random(0) *2);  
    }
  },
  'cycle': {
    name: "Cycle",
    move: () => {
      const play = cycleCounter; 
      cycleCounter++;
      if(cycleCounter > 2) {
        cycleCounter=0;
      }
      return play;
    }
  },
  'reflect': {
    name: "Reflect",
    move: 0
  },
  'rock': {
    name: "Rock",
    move: 0
  },
}
const moves = {
  0: "Rock",
  1: "Paper",
  2: "Scissors"
}


const setSettings = () => {
  const player1 = document.getElementById("setPlayer1").value;
  const player2 = document.getElementById("setPlayer2").value;
  const rounds = document.getElementById("setRounds").value;
  gameSettings = {
    player1: types[player1], player2: types[player2], rounds
  }
  toggleDivs();
  setGame();
}

const toggleDivs = () => {
  const settingsBar = document.getElementById("settingsBar");
  const scoreBar = document.getElementById("scoreBar");
  document.getElementById("humanButtons").style.display = "none";
  settingsBar.style.display == "none"? settingsBar.style.display ="block" :  settingsBar.style.display = "none";
  scoreBar.style.display == "none"? scoreBar.style.display = "block" :  scoreBar.style.display = "none";
  clearInterval(gameInterval);
}

const setGame = () => {
  const player1 = document.getElementById("player1");
  const player2 = document.getElementById("player2");

  player1.innerText = gameSettings.player1.name;
  player2.innerText = gameSettings.player2.name;
  rounds = gameSettings.rounds;
  player1Type.innerText = gameSettings.player1.name;
  player2Type.innerText = gameSettings.player2.name;
  startGame();
}

const startGame = () => {
  player1Score = 0;
  player2Score = 0;
  drawsScore = 0;
  drawsBoard.innerText = drawsScore;
  player1Board.innerText = player1Score;
  player2Board.innerText = player2Score;
  rounds = gameSettings.rounds;
  roundsLeft.innerText = rounds;
  if (gameSettings.player1.name != 'Human' && gameSettings.player2.name != 'Human' ) {
    gameInterval = setInterval(() => {
      if (rounds > 0) {
        round(gameSettings.player1.move(), gameSettings.player2.move());
        rounds--;
        roundsLeft.innerText = rounds;
      }
      else{
        clearInterval(gameInterval);
        winner();
      }
    }, 1000);
  } 
  else
  document.getElementById("humanButtons").style.display = "block";
}
const newGame = () => {
  clearInterval(gameInterval);
  rounds = gameSettings.rounds;
  startGame();
}

const player1Pick = document.getElementById("player1pick");
const player1Type = document.getElementById("player1type");
const player2Pick = document.getElementById("player2pick");
const player2Type = document.getElementById("player2type");
const result = document.getElementById("result");
const gameOver = document.getElementById("gameover");

const round = (move1, move2) => {
  player1Pick.innerText = moves[move1];
  player2Pick.innerText = moves[move2];
  if(move1 === move2) {
    console.log("Draw");
    drawsScore++;
    drawsBoard.innerText = drawsScore;
    result.innerText= "Draw";
  }
  else if (beats(move1, move2)){
    player1Score++;
    player1Board.innerText = player1Score;
    result.innerText= "Player1 wins";
  }
  else{
    player2Score++;
    player2Board.innerText = player2Score;
    result.innerText= "Player2 wins";
  }
};

const beats = (move1 , move2) => {
  return (move1 == (move2 +1) || move1 == (move2 -2))
}
const human = input => {
  if (gameSettings.player1.name === "Human")
    human1(input)
  else
    human2(input)
}

const human1 = input => {
  if (rounds != 0) {
    move1 = input;
    move2 = gameSettings.player2.move();
    console.log(move2);
    round(move1, move2);
    rounds--;
    roundsLeft.innerText = rounds;
  }
  else {
    winner();
      
  }
}
const human2 = input => {
  if (rounds != 0) {
    move2 = input;
    move1 = gameSettings.player1.move();
    console.log(move2);
    round(move1, move2);
    rounds--;
    roundsLeft.innerText = rounds;
  }
}
const random = () => {
  return Math.round(Math.random(0) *2);  
}
const cycle = () => {
  return cycleCounter; 
  cycleCounter++; 
}

const winner = () => {
  if(player1Score > player2Score)
      gameOver.innerText = `Player1 wins congratulations`
    else if(player2Score > player1Score)
      gameOver.innerText = `Player2 wins congratulations`
    else
      gameOver.innerText = `Nobody winds, it's a Draw`
}