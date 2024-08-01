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

const updateScoreboard = () => {
  document.getElementById('user-score').textContent = userScore;
  document.getElementById('pc-score').textContent = pcScore;
};

const startGame = () => {
  table.fill(null);
  document.querySelectorAll('.button').forEach(button => {
    button.classList.remove('cross', 'circle');
  });
  currentPlayer = Math.floor(Math.random() * 2);
  if (currentPlayer === 1) setTimeout(pcMove, 500);
};

const handleUserMove = (target, pos) => {
  if (table[pos] || currentPlayer !== 0) return;

  makeMove(target, pos, 'circle');

  if (checkWin()) {
    setTimeout(() => {
      alert('User wins!');
      userScore++;
      updateScoreboard();
    }, 100);
  } else if (isTie()) {
    setTimeout(() => alert('TIE!'), 100);
  } else {
    currentPlayer = 1;
    setTimeout(pcMove, 500);
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

const pcMove = () => {
  if (currentPlayer !== 1) return;

  let pos = findWinningMove('cross');
  if (pos === null) pos = findWinningMove('circle');
  if (pos === null) {
    const availablePositions = table.map((val, index) => (val === null ? index : null)).filter(val => val !== null);
    if (availablePositions.length) {
      pos = availablePositions[Math.floor(Math.random() * availablePositions.length)];
    }
  }

  if (pos !== null) {
    makePcMove(pos);
  }
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
      }, 100);
    } else if (isTie()) {
      setTimeout(() => alert('TIE!'), 100);
    } else {
      currentPlayer = 0;
    }
  }
};

const makeMove = (target, pos, className) => {
  target.classList.add(className);
  table[pos] = className;
};

document.addEventListener('click', ev => {
  const target = ev.target;
  if (target.classList.contains('button')) {
    const pos = target.dataset.pos;
    handleUserMove(target, pos);
  }
});

document.getElementById('restart-button').addEventListener('click', startGame);

startGame();
