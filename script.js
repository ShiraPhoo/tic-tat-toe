const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let board;
let mark = "X";
let win;

const squares = Array.from(document.querySelectorAll(".square"));
const messages = document.querySelector("h2");
document.getElementById("board").addEventListener("click", turn);
document.getElementById("replay-button").addEventListener("click", replay);

function startGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  render();
}

function render() {
  board.forEach((element, index) => {
    squares[index].textContent = element;
  });

  turns =
    mark == "X"
      ? (messages.textContent = `Phoo's turn!`)
      : (messages.textContent = `Fevian's turn!`);
  wins = win == "X" ? `Phoo wins the game!` : `Fevian wins the game!`;
  messages.textContent =
    win == "T" ? `Draw, queen!` : win ? `${wins}` : `${turns}`;
}

function turn(event) {
  let id = squares.findIndex(function (square) {
    return square === event.target;
  });
  board[id] = mark;

  mark = mark === "X" ? (mark = "O") : (mark = "X");

  win = getWinner();
  render();
}

function getWinner() {
  let winner = null;
  winningCombos.forEach(function (combo, index) {
    if (
      board[combo[0]] &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = board[combo[0]];
      document.getElementById("board").removeEventListener("click", turn);
    }
  });

  if (winner) {
    return winner;
  } else if (board.includes("")) {
    return null;
  } else {
    return "T";
  }
}
function replay() {
  startGame();
  messages.textContent = "Phoo's turn!";
  document.getElementById("board").addEventListener("click", turn);
}
startGame();
render();
getWinner();
