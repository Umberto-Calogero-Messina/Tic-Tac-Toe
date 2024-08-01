import '../scss/styles.scss';

const userScoreElement = document.getElementById('user-score');
const pcScoreElement = document.getElementById('pc-score');
const messageElement = document.getElementById('startmove');
const restartElement = document.getElementById('restart-button');
const popupElement = document.getElementById('popup');
const popupMessageElement = document.getElementById('popup-message');
const buttonElement = document.querySelectorAll('.button');
const okButtonElement = document.getElementById('popup-ok-button');

const table = Array(9).fill(null);
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let userScore = 0;
let pcScore = 0;
let currentPlayer = null;
let gameActive = true;

const updateScoreboard = () => {
  userScoreElement.textContent = userScore;
  pcScoreElement.textContent = pcScore;
};

const updateTurnMessage = () => {
  if (!gameActive) {
    messageElement.textContent = 'Partita terminata';
  } else {
    messageElement.textContent = currentPlayer === 0 ? 'Turno Player' : 'Turno PC';
  }
};

const toggleRestartButton = enabled => {
  restartElement.disabled = !enabled;
};

const showPopup = message => {
  popupMessageElement.textContent = message;
  popupElement.classList.remove('d-none');
};

const hidePopup = () => {
  popupElement.classList.add('d-none');
};

const endGame = (message, winner) => {
  setTimeout(() => {
    showPopup(message);
    if (winner === 'user') userScore++;
    if (winner === 'pc') pcScore++;
    updateScoreboard();
    gameActive = false;
    updateTurnMessage();
    toggleRestartButton(true);
  }, 100);
};

const checkWin = () =>
  winningCombinations.some(([a, b, c]) => table[a] && table[a] === table[b] && table[a] === table[c]);

const isTie = () => table.every(pos => pos !== null);

const findWinningMove = player => {
  for (const [a, b, c] of winningCombinations) {
    if (table[a] === player && table[b] === player && table[c] === null) return c;
    if (table[a] === player && table[c] === player && table[b] === null) return b;
    if (table[b] === player && table[c] === player && table[a] === null) return a;
  }
  return null;
};

const shouldPlayDefensively = () => Math.random() < 0.6;

const checkAndHandleGameState = (winner, playerType) => {
  if (checkWin()) {
    endGame(winner, playerType);
  } else if (isTie()) {
    endGame('Empate!');
  } else {
    switchPlayer();
  }
};

const handleUserMove = (target, pos) => {
  if (!gameActive || table[pos] || currentPlayer !== 0) return;

  makeMove(target, pos, 'circle');
  checkAndHandleGameState('User ha ganado!', 'user');
};

const makePcMove = pos => {
  const targetElement = document.querySelector(`span[data-pos='${pos}']`);
  if (targetElement) {
    makeMove(targetElement, pos, 'cross');
    checkAndHandleGameState('PC ha ganado', 'pc');
  }
};

const makeMove = (target, pos, className) => {
  target.classList.add(className);
  table[pos] = className;
};

const switchPlayer = () => {
  currentPlayer = 1 - currentPlayer;
  updateTurnMessage();
  if (currentPlayer === 1) {
    setTimeout(pcMove, 500);
  }
};

const pcMove = () => {
  if (!gameActive || currentPlayer !== 1) return;

  let pos = findWinningMove('cross');
  if (pos === null && shouldPlayDefensively()) {
    pos = findWinningMove('circle');
  }
  if (pos === null) {
    const availablePositions = table.map((val, index) => (val === null ? index : null)).filter(val => val !== null);
    if (availablePositions.length) {
      pos = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    }
  }

  if (pos !== null) makePcMove(pos);
};

const startGame = () => {
  table.fill(null);
  buttonElement.forEach(button => {
    button.classList.remove('cross', 'circle');
  });
  currentPlayer = Math.floor(Math.random() * 2);
  gameActive = true;
  updateTurnMessage();
  toggleRestartButton(false);
  hidePopup();
  if (currentPlayer === 1) setTimeout(pcMove, 500);
};

const restartGame = () => startGame();

document.addEventListener('click', ev => {
  const target = ev.target;
  if (target.classList.contains('button')) {
    const pos = target.dataset.pos;
    if (gameActive) {
      handleUserMove(target, pos);
    } else {
      showPopup('Partida terminada. Reinicia el juego!');
    }
  }
});

okButtonElement.addEventListener('click', hidePopup);
restartElement.addEventListener('click', restartGame);

startGame();
