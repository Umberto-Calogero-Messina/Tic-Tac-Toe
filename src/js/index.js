import '../scss/styles.scss';

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
  document.getElementById('user-score').textContent = userScore;
  document.getElementById('pc-score').textContent = pcScore;
};

const updateTurnMessage = () => {
  const messageElement = document.getElementById('startmove');
  if (!gameActive) {
    messageElement.textContent = 'Partita terminata';
  } else if (currentPlayer === 0) {
    messageElement.textContent = "User's turn";
  } else {
    messageElement.textContent = "PC's turn";
  }
};

const toggleRestartButton = enabled => {
  const restartButton = document.getElementById('restart-button');
  restartButton.disabled = !enabled;
};

const startGame = () => {
  table.fill(null);
  document.querySelectorAll('.button').forEach(button => {
    button.classList.remove('cross', 'circle');
  });
  currentPlayer = Math.floor(Math.random() * 2);
  gameActive = true;
  updateTurnMessage();
  toggleRestartButton(false);
  if (currentPlayer === 1) setTimeout(pcMove, 1000);
};

const showGameEndAlert = () => alert('Game over. Please restart the game.');

const handleUserMove = (target, pos) => {
  if (!gameActive || table[pos] || currentPlayer !== 0) return;

  makeMove(target, pos, 'circle');

  if (checkWin()) {
    setTimeout(() => {
      alert('User wins!');
      userScore++;
      updateScoreboard();
      gameActive = false;
      updateTurnMessage();
      toggleRestartButton(true);
    }, 100);
  } else if (isTie()) {
    setTimeout(() => {
      alert('TIE!');
      gameActive = false;
      updateTurnMessage();
      toggleRestartButton(true);
    }, 100);
  } else {
    switchPlayer();
  }
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

const makePcMove = pos => {
  const target = document.querySelector(`span[data-pos='${pos}']`);
  if (target) {
    makeMove(target, pos, 'cross');
    if (checkWin()) {
      setTimeout(() => {
        alert('PC wins!');
        pcScore++;
        updateScoreboard();
        gameActive = false;
        updateTurnMessage();
        toggleRestartButton(true);
      }, 100);
    } else if (isTie()) {
      setTimeout(() => {
        alert('TIE!');
        gameActive = false;
        updateTurnMessage();
        toggleRestartButton(true);
      }, 100);
    } else {
      switchPlayer();
    }
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
    setTimeout(pcMove, 1000);
  }
};

const restartGame = () => startGame();

document.addEventListener('click', ev => {
  const target = ev.target;
  if (target.classList.contains('button')) {
    const pos = target.dataset.pos;
    if (gameActive) {
      handleUserMove(target, pos);
    } else {
      showGameEndAlert();
    }
  }
});

document.getElementById('restart-button').addEventListener('click', restartGame);

startGame();
