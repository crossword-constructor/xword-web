export const buildPlayableBoard = (puzzle, userPuzzle) => {
  const { board, clues, dimensions } = puzzle;
  const { board: userBoard } = userPuzzle;
  const cluesObj = {};
  for (let i = 0; i < clues.length; i += 1) {
    cluesObj[clues[i].position] = { ...clues[i] };
    cluesObj[clues[i].position].cells = [];
  }
  let currentNumber = 1;
  const downClueTracker = {};
  const rows = [];
  let tempRow = [];
  board.forEach((cell, i) => {
    tempRow.push(cell);
    if ((i + 1) % dimensions.width === 0) {
      rows.push([...tempRow]);
      tempRow = [];
    }
  });
  const playableBoard = rows.map((row, rowCount) => {
    let acrossClue = '1A';
    let downClue = '1D';
    return row.map((col, colCount) => {
      let number = null;
      if (col.style === '#BS#') {
        return { answer: col.text, style: col.style };
      }
      // If we're in the top row, every white square has a down clue
      if (rowCount === 0) {
        downClueTracker[colCount] = currentNumber;
      }
      // If we're in the first column, every white square has an across clue
      if (colCount === 0) {
        acrossClue = `${currentNumber}A`;
      }
      // If the previous square is black, this is an across clue
      if (row[colCount - 1] && row[colCount - 1].style === '#BS#') {
        acrossClue = `${currentNumber}A`;
      }
      // If there is a row above and the cell above is black, this is a down clue
      if (rows[rowCount - 1] && rows[rowCount - 1][colCount].style === '#BS#') {
        downClueTracker[colCount] = currentNumber;
      }
      downClue = `${downClueTracker[colCount]}D`;
      cluesObj[acrossClue].cells.push([rowCount, colCount]);
      cluesObj[downClue].cells.push([rowCount, colCount]);
      // Check if this cell gets a number
      if (
        rowCount === 0 ||
        colCount === 0 ||
        row[colCount - 1].style === '#BS#' ||
        rows[rowCount - 1][colCount].style === '#BS#'
      ) {
        number = currentNumber;
        currentNumber += 1;
      }
      return {
        guess: userBoard[rowCount + colCount * dimensions.height].text,
        answer: col.text,
        style: col.style,
        number,
        clues: [acrossClue, downClue],
      };
    });
  });
  return { ...puzzle, playableBoard, clues: cluesObj };
};

export const buildConstructableBoard = size => {
  const cols = new Array(size).fill({ text: '', style: '' });
  const rows = new Array(size).fill([...cols]);
  const { board: constructableBoard, clues } = recalculateCluesAndNumbers(rows);
  return { constructableBoard, clues };
};

export const recalculateBlackSquares = board => {};

export const recalculateCluesAndNumbers = board => {
  const cluesObj = {};
  let currentNumber = 1;
  const downClueTracker = {};
  const newBoard = board.map((row, rowCount) => {
    let acrossClue = '1A';
    let downClue = '1D';
    return row.map((col, colCount) => {
      let number = null;
      if (col.style === '#BS#') {
        return { answer: col.text, style: col.style };
      }

      if (
        rowCount === 0 ||
        colCount === 0 ||
        row[colCount - 1].style === '#BS#' ||
        board[rowCount - 1][colCount].style === '#BS#'
      ) {
        number = currentNumber;
        if (colCount === 0 || row[colCount - 1].style === '#BS#') {
          // we have an across clue
          acrossClue = `${number}A`;
          cluesObj[`${number}A`] = { clue: '', answer: '', cells: [] };
        }
        if (rowCount === 0 || board[rowCount - 1][colCount].style === '#BS#') {
          // we have a down clue
          downClueTracker[colCount] = number;
          cluesObj[`${number}D`] = { clue: '', answer: '', cells: [] };
        }
        currentNumber += 1;
      }
      downClue = `${downClueTracker[colCount]}D`;
      cluesObj[acrossClue].cells.push([rowCount, colCount]);
      cluesObj[downClue].cells.push([rowCount, colCount]);
      return {
        ...col,
        answer: col.text,
        style: col.style,
        number,
        clues: [acrossClue, downClue],
      };
    });
  });
  return { board: newBoard, clues: cluesObj };
};

// Take the current position, direction, keypressed and finds the next cell in that row or col that isn't a blacksquare.
// If it reaches the end of the board it goes back to the beginning
// If a key (arrow key code) is not provided we deduce it from the direction

const maxSearchDepth = 200;
export const findNextCell = (
  [row, col],
  direction,
  key = direction === 'across' ? 39 : 40,
  board,
  allowBlackSquare = false
) => {
  let validCellFound;
  const originalRow = row;
  const originalCol = col;
  let currentSearchDepth = 0;
  while (!validCellFound) {
    currentSearchDepth += 1;
    if (direction === 'across') {
      if (key === 39) {
        col += 1;
        if (!board[row][col]) {
          return [originalRow, originalCol];
        }
      } else {
        col -= 1;
        if (!board[row][col]) {
          return [originalRow, originalCol];
        }
      }
    } else if (direction === 'down') {
      if (key === 40) {
        row += 1;
        if (!board[row]) {
          row -= 1;
        }
      } else {
        row -= 1;
        if (!board[row]) {
          row += 1;
        }
      }
    }
    if (board[row][col].style === '#BS#' && !allowBlackSquare) {
      validCellFound = false;
    } else {
      validCellFound = true;
      return [row, col];
    }
    if (currentSearchDepth >= maxSearchDepth) {
      console.warn('Max search depth reached for finding valid cell');
      return;
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
    if (!currentCell || currentCell.style === '#BS#') {
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

/**
 * @param  {ObjectId} puzzleId
 * @param  {Array} playableBoard
 * @return {Array} saveableBoard
 * @description maps over a playable board returning only the guesses
 */
export const buildSaveableBoard = playableBoard => {
  return playableBoard.map(row => {
    return row.map(cell => {
      if (cell.answer === '#BS#') {
        return cell.answer;
      }
      return cell.guess;
    });
  });
};

// saves board reducer selection object to localStorage
export const saveSelection = (selection, direction, userPuzzleId) => {
  try {
    selection.userPuzzleId = userPuzzleId;
    window.localStorage.setItem('selection', JSON.stringify(selection));
    window.localStorage.setItem('direction', direction);
  } catch (err) {
    console.log('error writing selection to local storage: ', err);
  }
};
