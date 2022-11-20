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
  top.setAttribute('id', 'column-top');
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
}

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

/** endGame: announce game end */

function endGame(msg) {
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get column from ID of clicked cell
  const column = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const row = findSpotForCol(column);
  if (row === null) {
    return;
  }

  //*************************************************************************************
  console.log(row, column)
  // **************************************************************************************

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(row, column);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame

  // switch players
  if (currPlayer === 1) {
    currPlayer = 2;
    playerColor = 'blue'
  } else {
    currPlayer = 1;
    playerColor = 'red'
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (row, column) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    //*************************************************************************************
    console.log(playerColor)
    //*************************************************************************************

    return cells.every(
      ([row, column]) =>
        row >= 0 &&
        row < HEIGHT &&
        column >= 0 &&
        column < WIDTH &&
        board[row][column] === playerColor
    );
  }

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

makeBoard();
makeHtmlBoard();
