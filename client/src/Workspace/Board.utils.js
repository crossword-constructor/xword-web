export const buildPlayableBoard = puzzle => {
  const { board, clues } = puzzle;

  const cluesObj = {};
  for (let i = 0; i < clues.length; i += 1) {
    cluesObj[clues[i].position] = clues[i];
    cluesObj[clues[i].position].cells = [];
  }
  let currentNumber = 1;
  const downClueTracker = {};
  const playableBoard = board.map((row, rowCount) => {
    let acrossClue = '1A';
    let downClue = '1D';
    return row.map((col, colCount) => {
      let number = null;
      if (col === '#BlackSquare#') {
        return { answer: col };
      }
      // deduce clues associated with this cell
      if (rowCount === 0) {
        downClueTracker[colCount] = currentNumber;
      }
      if (colCount === 0) {
        acrossClue = `${currentNumber}A`;
      }
      if (row[colCount - 1] === '#BlackSquare#') {
        acrossClue = `${currentNumber}A`;
      }
      if (
        board[rowCount - 1] &&
        board[rowCount - 1][colCount] === '#BlackSquare#'
      ) {
        downClueTracker[colCount] = currentNumber;
      }
      downClue = `${downClueTracker[colCount]}D`;
      cluesObj[acrossClue].cells.push([rowCount, colCount]);
      cluesObj[downClue].cells.push([rowCount, colCount]);
      // Check if this cell gets a number
      if (
        rowCount === 0 ||
        colCount === 0 ||
        row[colCount - 1] === '#BlackSquare#' ||
        board[rowCount - 1][colCount] === '#BlackSquare#'
      ) {
        number = currentNumber;
        currentNumber += 1;
      }

      // acrossClue = currentNuber;
      return { guess: '', answer: col, number, clues: [acrossClue, downClue] };
    });
  });
  return { playableBoard, clues: cluesObj };
};

// Take the current position, direction, keypressed and finds the next cell in that row or col that isn't a blacksquare.
// If it reaches the end of the board it goes back to the beginning
// If a key (arrow key code) is not provided we deduce it from the direction

export const findNextCell = (
  [row, col],
  direction,
  key = direction === 'across' ? 39 : 40,
  board
) => {
  let validCellFound;
  while (!validCellFound) {
    if (direction === 'across') {
      if (key === 39) {
        col += 1;
        if (!board[row][col]) {
          col = 0;
        }
      } else {
        col -= 1;
        if (!board[row][col]) {
          col = board[0].length - 1;
        }
      }
    } else if (direction === 'down') {
      if (key === 40) {
        row += 1;
        if (!board[row]) {
          row = 0;
        }
      } else {
        row -= 1;
        if (!board[row]) {
          row = board.length - 1;
        }
      }
    }
    if (board[row][col].answer === '#BlackSquare#') {
      validCellFound = false;
    } else {
      validCellFound = true;
      return [row, col];
    }
  }
};

// Search for end or beginnging of a word
// board = playableBoard
export const searchForBoundaryCell = (row, col, direction, incOrDec, board) => {
  let cell;
  let endCounter = direction === 'across' ? col : row;
  let currentCell;
  while (!cell) {
    if (direction === 'across') {
      currentCell = board[row][endCounter];
    } else {
      try {
        currentCell = board[parseInt(endCounter, 10)][col];
      } catch (err) {
        currentCell = undefined;
      }
    }
    if (!currentCell || currentCell === '#BlackSquare#') {
      cell = incOrDec === 'INCREMENT' ? endCounter - 1 : endCounter + 1;
      return cell;
    }
    if (incOrDec === 'INCREMENT') {
      endCounter += 1;
    } else {
      endCounter -= 1;
    }
  }
};
