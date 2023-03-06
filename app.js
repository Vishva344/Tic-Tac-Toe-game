
const squares = document.querySelectorAll('.square');
const turnText = document.getElementById('turn');
const resetButton = document.getElementById('reset-button');
let player1 = prompt('Enter Player 1 name:');
let player2 = prompt('Enter Player 2 name:');
let currentPlayer = 'X';
let gameOver = false;

function checkWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i];
    if (squares[a].textContent === currentPlayer &&
        squares[b].textContent === currentPlayer &&
        squares[c].textContent === currentPlayer) {
      return true;
    }
  }

  return false;
}

function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === '') {
      return false;
    }
  }

  return true;
}

function endGame(winner) {
  gameOver = true;
  if (winner === 'Tie') {
    turnText.textContent = 'It\'s a tie!';
  } else {
    const winnerName = winner === 'X' ? player1 : player2;
    turnText.textContent = `${winnerName} wins!`;
  }
}

function handleClick(event) {
  if (gameOver) {
    return;
  }

  const square = event.target;
  if (square.textContent !== '') {
    return;
  }

  square.textContent = currentPlayer;

  if (checkWin()) {
    endGame(currentPlayer);
  } else if (checkTie()) {
    endGame('Tie');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnText.textContent = `${currentPlayer === 'X' ? player1 : player2}'s turn`;
  }
}

function resetGame() {
  player1 = prompt('Enter Player 1 name:');
  player2 = prompt('Enter Player 2 name:');
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = '';
  }
  currentPlayer = 'X';
  gameOver = false;
  turnText.textContent = `${player1}'s turn`;
}

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', handleClick);
}

resetButton.addEventListener('click', resetGame);
turnText.textContent = `${player1}'s turn`;
