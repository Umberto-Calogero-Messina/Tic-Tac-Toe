import '../scss/styles.scss';

const userScoreElement = document.getElementById('user-score');
const pcScoreElement = document.getElementById('pc-score');
const messageElement = document.getElementById('startmove');
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

import iconCross from '../assets/images/cross.svg';
import iconCircle from '../assets/images/circle.svg';

const updateScoreboard = () => {
  userScoreElement.textContent = userScore;
  pcScoreElement.textContent = pcScore;
};

const updateTurnMessage = () => {
  if (!gameActive) {
    messageElement.textContent = 'Partita terminata';
  } else {
    messageElement.textContent = currentPlayer === 'user' ? 'Es tu turno' : 'Es el turno del ordenador';
  }
};

const showPopup = message => {
  popupMessageElement.innerHTML = message;
  popupElement.classList.remove('d-none');
};

const hidePopup = () => {
  popupElement.classList.add('d-none');
};

const endGame = winner => {
  setTimeout(() => {
    let message = '';
    if (winner === 'user') {
      message = `
        <div class="popup-content">
          <img src="${iconCross}" class="popup-image-cross" alt="Cross">
          <div class="winner-message">¡GANADOR!</div>
        </div>
      `;
      userScore++;
    } else if (winner === 'pc') {
      message = `
        <div class="popup-content">
          <img src="${iconCircle}" class="popup-image" alt="Circle">
          <div class="winner-message">¡GANADOR!</div>
        </div>
      `;
      pcScore++;
    } else {
      message = `
        <div class="popup-content tie">
          <img src="${iconCircle}" class="popup-image" alt="Circle">
          <img src="${iconCross}" class="popup-image-cross" alt="Cross">
        </div>
        <div class="tie-message">¡EMPATE!</div>
      `;
    }
    showPopup(message);
    updateScoreboard();
    gameActive = false;
    updateTurnMessage();
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

const checkAndHandleGameState = () => {
  if (checkWin()) {
    endGame(currentPlayer);
  } else if (isTie()) {
    endGame(null);
  } else {
    switchPlayer();
  }
};

const handleUserMove = (target, pos) => {
  if (!gameActive || table[pos] || currentPlayer !== 'user') return;

  makeMove(target, pos, 'cross');
  checkAndHandleGameState();
};

const makePcMove = pos => {
  const targetElement = document.querySelector(`span[data-pos='${pos}']`);
  if (targetElement) {
    makeMove(targetElement, pos, 'circle');
    checkAndHandleGameState();
  }
};

const makeMove = (target, pos, className) => {
  target.classList.add(className);
  table[pos] = className;
};

const switchPlayer = () => {
  currentPlayer = currentPlayer === 'user' ? 'pc' : 'user';
  updateTurnMessage();
  if (currentPlayer === 'pc') {
    setTimeout(pcMove, 1000);
  }
};

const pcMove = () => {
  if (!gameActive || currentPlayer !== 'pc') return;

  let pos = findWinningMove('circle');
  if (pos === null && shouldPlayDefensively()) {
    pos = findWinningMove('cross');
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
  currentPlayer = Math.random() < 0.5 ? 'user' : 'pc';
  gameActive = true;
  updateTurnMessage();
  hidePopup();
  if (currentPlayer === 'pc') setTimeout(pcMove, 1000);
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

okButtonElement.addEventListener('click', restartGame);

startGame();
