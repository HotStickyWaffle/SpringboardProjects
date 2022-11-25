class Game {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.currPlayer = 1; // active player: 1 (red) or 2 (blue)
        this.playerColor = 'red';

        this.board = [];
    }

    makeBoard() {
        for (let i = 0; i < this.height; i++) {
            const arr = [];
            for (let j = 0; j < this.width; j++) {
                arr.push(null);
            }
            this.board.push(arr)
        }
    }

    makeHtmlBoard() {
        const htmlBoard = document.querySelector('#board')

        // Build and append top row for selecting colomn to drop piece
        const top = document.createElement('tr');
        top.setAttribute('id', 'column-top-player1');
        top.addEventListener('click', handleClick);

        for (let i = 0; i < this.width; i++) {
            let headCell = document.createElement('td');
            headCell.setAttribute('id', i);
            top.append(headCell);
        }
        htmlBoard.append(top);

        // Build board based on specified height and width
        for (let i = 0; i < this.height; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j this.width; j++) {
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

    findSpotForCol(column) {
        for (let i = this.board.length - 1; i >= 0; i--) {
            if (!this.board[i][column]) {
                return i
            }
        } return null
    }

    placeInTable(row, column) {
        const placedCell = document.getElementById(`${row}-${column}`);
        placedCell.classList.remove('empty');
        const placedDiv = document.createElement('div')
        placedCell.append(placedDiv)
        if (this.currPlayer === 1) {
            //add color chip
            placedDiv.classList.add('filledRed');
            //update board array
            board[row][column] = 'red'
        } else {
            placedDiv.classList.add('filledBlue');
            board[row][column] = 'blue'
        }
    }

    endGame(msg) {
        alert(msg)
    }

    handleClick(evt) {
        // get column from ID of clicked cell
        const column = +evt.target.id

        // get next spot in column (if none, ignore click)
        const row = this.findSpotForCol(column);

        if (row === null) {
            return;
        }

        this.placeInTable(row, column);
        this.setTimeout(this.checkAndSwitch, 1)
    }

    checkAndSwitch() {
        if (this.checkForWin()) {
            return this.endGame(`Player ${this.currPlayer} won!`);
        }

        if (this.checkForFilledBoard()) {
            alert('The board has been filled and there is no winner.  Try again?')
        }

        const player1 = document.querySelector('#player1Info')
        const player2 = document.querySelector('#player2Info')
        // switch players
        if (this.currPlayer === 1) {
            this.currPlayer = 2;
            this.playerColor = 'blue';
            const top = document.querySelector('#column-top-player1')
            top.setAttribute('id', 'column-top-player2');

            player1.setAttribute('style', 'background-color: none');
            player2.setAttribute('style', 'background-color: rgba(17, 70, 143, .5)');

        } else {
            this.currPlayer = 1;
            this.playerColor = 'red';
            const top = document.querySelector('#column-top-player2')
            top.setAttribute('id', 'column-top-player1');
            player1.setAttribute('style', 'background-color: rgba(218, 18, 18, 0.5)');
            player2.setAttribute('style', 'background-color: none');
        }
    }

    checkForWin() {

        function _win(cells) {

            return cells.every(
                ([row, column]) =>
                    row >= 0 &&
                    row < this.height &&
                    column >= 0 &&
                    column < this.width &&
                    board[row][column] === this.playerColor
            );
        }

        //loop through each square on the board, create an array of coordinates, and then run each array through the _win function to check if 4 squares in a row all have the class that matches the current player
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
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

    checkForFilledBoard() {
        for (let i = 0; i < this.board.length; i++) {
            return this.board[i].every((el) => el !== null)
        }
    }

    // this.makeBoard();
    // this.makeHtmlBoard();
}

// const resetButton = document.querySelector('button');
// resetButton.addEventListener('click', () => { location.reload() })