/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 (red) or 2 (blue)
let playerColor = 'red'

const board = [

]

//populate array for tracking the value of all the squares
function makeBoard() {
  for (let i = 0; i < HEIGHT; i++) {
    const arr = [];
    for (let j = 0; j < WIDTH; j++) {
      arr.push(null);
    }
    board.push(arr)
  }
}

function makeHtmlBoard() {
  const htmlBoard = document.querySelector('#board')

  // Build and append top row for selecting colomn to drop piece
  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top-player1');
  top.addEventListener('click', handleClick);

  for (let i = 0; i < WIDTH; i++) {
    let headCell = document.createElement('td');
    headCell.setAttribute('id', i);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // Build board based on specified height and width
  for (let i = 0; i < HEIGHT; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < WIDTH; j++) {
      const cell = document.createElement('td');
      cell.setAttribute('id', `${i}-${j}`);
      cell.setAttribute('class', 'empty')
      row.append(cell);
    }
    htmlBoard.append(row);
  }

  const player1 = document.querySelector('#player1Info')
  player1.setAttribute('style', 'background-color: rgba(218, 18, 18, 0.5)')
}


//Finds the lowest empty row in the selected column
function findSpotForCol(column) {
  if (document.getElementById(`5-${column}`).classList.contains('empty')) {
    return 5;
  }
  else if (document.getElementById(`4-${column}`).classList.contains('empty')) {
    return 4
  }
  else if (document.getElementById(`3-${column}`).classList.contains('empty')) {
    return 3
  }
  else if (document.getElementById(`2-${column}`).classList.contains('empty')) {
    return 2
  }
  else if (document.getElementById(`1-${column}`).classList.contains('empty')) {
    return 1
  }
  else if (document.getElementById(`0-${column}`).classList.contains('empty')) {
    return 0
  }
  else { return null }
}

function placeInTable(row, column) {
  const placedCell = document.getElementById(`${row}-${column}`);
  placedCell.classList.remove('empty');
  const placedDiv = document.createElement('div')
  placedCell.append(placedDiv)
  if (currPlayer === 1) {
    //add color chip
    placedDiv.classList.add('filledRed');
    //update board array
    board[row][column] = 'red'
  } else {
    placedDiv.classList.add('filledBlue');
    board[row][column] = 'blue'
  }
}

function endGame(msg) {
  alert(msg)
}

function handleClick(evt) {
  // get column from ID of clicked cell
  const column = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const row = findSpotForCol(column);
  if (row === null) {
    return;
  }

  placeInTable(row, column);

  setTimeout(checkAndSwitch, 1)

}

//check for win, then check for filled board, and then switch players
function checkAndSwitch() {
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  if (checkForFilledBoard()) {
    alert('The board has been filled and there is no winner.  Try again?')
  }

  // switch players
  if (currPlayer === 1) {
    currPlayer = 2;
    playerColor = 'blue';
    const top = document.querySelector('#column-top-player1')
    top.setAttribute('id', 'column-top-player2');

    const player1 = document.querySelector('#player1Info')
    player1.setAttribute('style', 'background-color: none');
    const player2 = document.querySelector('#player2Info')
    player2.setAttribute('style', 'background-color: rgba(17, 70, 143, .5)');

  } else {
    currPlayer = 1;
    playerColor = 'red';
    const top = document.querySelector('#column-top-player2')
    top.setAttribute('id', 'column-top-player1');

    const player1 = document.querySelector('#player1Info')
    player1.setAttribute('style', 'background-color: rgba(218, 18, 18, 0.5)');
    const player2 = document.querySelector('#player2Info')
    player2.setAttribute('style', 'background-color: none');
  }
}

function checkForWin() {

  function _win(cells) {

    return cells.every(
      ([row, column]) =>
        row >= 0 &&
        row < HEIGHT &&
        column >= 0 &&
        column < WIDTH &&
        board[row][column] === playerColor
    );
  }

  //loop through each square on the board, create an array of coordinates, and then run each array through the _win function to check if 4 squares in a row all have the class that matches the current player
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      const horiz = [[i, j], [i, j + 1], [i, j + 2], [i, j + 3]];
      const vert = [[i, j], [i + 1, j], [i + 2, j], [i + 3, j]];
      const diagDR = [[i, j], [i + 1, j + 1], [i + 2, j + 2], [i + 3, j + 3]];
      const diagDL = [[i, j], [i + 1, j - 1], [i + 2, j - 2], [i + 3, j - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

function checkForFilledBoard() {
  for (let i = 0; i < board.length; i++) {
    return board[i].every((el) => el !== null)
  }
}

const resetButton = document.querySelector('button');
const resetGame = () => { location.reload() }
resetButton.addEventListener('click', resetGame)

makeBoard();
makeHtmlBoard();
