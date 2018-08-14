const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = []

  for(rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    //making an empty array that will server as a row for the board
    let row = []

//looping through the columns to add the rows
    for(columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    //push an empty space that acts as a square on the board
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}
console.log(generatePlayerBoard(5, 4));
