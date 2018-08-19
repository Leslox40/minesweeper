//functiont to generate player's board
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = []

  for(rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    //making an empty array that will server as a row for the board
    let row = []

//looping through the columns to add the rows
    for(columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    //push an empty space that acts as a square/ column on the board
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}
//console.log(generatePlayerBoard(5, 4));

//function to generate bombs on the board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = []

  for(rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    //making an empty array that will server as a row for the board
    let row = []

//looping through the columns to add the rows
    for(columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
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


//function to print Playerboard in a nicely formatted manner
const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
}

//function to get number of neighbouring bombs around a fliped tile
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffSets = [[-1, 1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  numberOfBombs = 0;

  neighborOffSets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];

    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      numberOfBombs++;
    }
  });
  return numberOfBombs;
}

//function that takes the tile location of the tile to be flipped
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  //Tile Check
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log(`This tile has already been flipped!`);
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    //checking bomb board to place bomb on player board
    playerBoard[rowIndex][columnIndex] = 'B';
    return playerBoard;
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    return playerBoard;
  }
}


//testing results
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
flipTile(playerBoard, bombBoard, 0, 0);
printBoard(playerBoard);
