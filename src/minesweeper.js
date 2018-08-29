//Game class
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

//Player moves are handled here
  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board._playerBoard[rowIndex][columnIndex] === 'B') {
      console.log(`THE GAME IS OVER!! :(`);
      this._board.print(this._board._playerBoard);
    } else if (this._board.hasSafeTiles()) {
      console.log(`CONGRATULATIONS YOU HAVE WON!!`);
      this._board.print(this._board._playerBoard);
    } else {
      console.log(`Current Board: `)
      this._board.print(this._board._playerBoard);
    }
  }

}


//Board Class
class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  //getter method to instance of playerBoard.
  get playerBoard() {
    return this._playerBoard;
  }

  //adding flipTile function to Board class
  //method that takes the tile location of the tile to be flipped
  flipTile(rowIndex, columnIndex) {
    //Tile Check
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log(`This tile has already been flipped!`);
      return;
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      //checking bomb board to place bomb on player board
      this._playerBoard[rowIndex][columnIndex] = 'B';
      return this._playerBoard;
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      return this._playerBoard;
    }

    this._numberOfTiles--;
  }

  //getNumberOfNeighborBombs method goes here
  //method to get number of neighbouring bombs around a fliped tile
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffSets = [[-1, 1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffSets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        numberOfBombs++;
      }
    });
    return numberOfBombs;
  }

  //method checkes for if there are still safe Titles
  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  //Method to print Playerboard in a nicely formatted manner
  print(board) {
    console.log(board.map(row => row.join(' | ')).join('\n'));
  }

  //method to generate player's board
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = []

    for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      //making an empty array that will server as a row for the board
      let row = []

  //looping through the columns to add the rows
      for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      //push an empty space that acts as a square/ column on the board
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  //function to generate bombs on the board
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = []

    for(let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      //making an empty array that will server as a row for the board
      let row = []

  //looping through the columns to add the rows
      for(let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      //push an empty space that acts as a square on the board
        row.push(null);
      }
      board.push(row);
    }


    let numberOfBombsPlaced = 0;
    while(numberOfBombsPlaced < numberOfBombs) {
      //generating random row and column locations on the board to place bombs
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

      //Checking if bomb does not exist in the randomly chosen location
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        //setting the bomb to those locations
        board[randomRowIndex][randomColumnIndex] = 'B'
        //incrementing bomb counter
        numberOfBombsPlaced++;
      }
    }
    return board;
  }

}

const g = new Game(4, 4, 4);
g.playMove(1, 1);

/*//testing results
let playerBoard = generatePlayerBoard(3, 4);
let bombBoard = generateBombBoard(3, 4, 5);

console.log(`Player Board: `);
printBoard(playerBoard)
console.log(`Bomb Board: `)
printBoard(bombBoard);

console.log('Player Board:');
printBoard(playerBoard);
console.log('Bomb Board:')
printBoard(bombBoard);
console.log('Updated Player Board');
flipTile(playerBoard, bombBoard, 1, 2);
printBoard(playerBoard); */
