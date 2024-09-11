import { Cell } from '../Common/GridPreview';
import { ClueAnswerPair, Puzzle, UserPuzzle } from '../ts-types';
export const buildBoardPreview = (board: Array<Cell>) => {};

export const buildPlayableBoard = (puzzle: Puzzle, userPuzzle: UserPuzzle) => {
  const { board, clues, width } = puzzle;
  const { board: userBoard } = userPuzzle;
  const cluesObj: Record<string, any> = {};
  for (let i = 0; i < clues.length; i += 1) {
    cluesObj[clues[i].position] = { ...clues[i] };
    cluesObj[clues[i].position].cells = [];
  }
  let currentNumber = 1;
  const downClueTracker: Record<number, number> = {};
  const rows: Array<Array<Cell>> = [];
  let tempRow: Array<Cell> = [];
  board.forEach((cell, i) => {
    tempRow.push(cell);
    if ((i + 1) % width === 0) {
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
        guess: userBoard[rowCount + colCount * width].text,
        answer: col.text,
        style: col.style,
        number,
        clues: [acrossClue, downClue],
      };
    });
  });
  return { ...puzzle, playableBoard, clues: cluesObj };
};

export const buildConstructableBoard = (
  size: number
): {
  constructableBoard: PlayableCell[][];
  clues: Record<string, ClueAnswerPair>;
} => {
  const cols = new Array(size).fill({ text: '', style: '' });
  const rows = new Array(size).fill([...cols]);
  const { board: constructableBoard, clues } = recalculateCluesAndNumbers(rows);
  return { constructableBoard, clues };
};

export const recalculateBlackSquares = (board: PlayableCell[][]) => {};

export const recalculateCluesAndNumbers = (
  board: PlayableCell[][]
): { board: PlayableCell[][]; clues: Record<string, any> } => {
  const cluesObj: Record<string, any> = {};
  let currentNumber = 1;
  const downClueTracker: Record<string, any> = {};
  const newBoard: PlayableCell[][] = board.map((row, rowCount) => {
    let acrossClue = '1A';
    let downClue = '1D';
    return row.map((col, colCount) => {
      let number = null;
      let clues: [string, string] = ['1A', '1D'];
      if (col.style === '#BS#') {
        return {
          answer: col.text,
          style: col.style,
          clues,
          position: '',
          guess: '',
          number: '',
          text: '',
        };
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
        number: number?.toString() as string,
        clues: [acrossClue, downClue],
      };
    });
  });
  return { board: newBoard, clues: cluesObj };
};

export const searchForBoundaryCell = (
  row: number,
  col: number,
  direction: string,
  incOrDec: string,
  board: Array<Array<any>>
): number => {
  let cell: number = -1;
  let endCounter: number = direction === 'across' ? col : row;
  let currentCell;
  let lookingForCell = true;
  while (!lookingForCell) {
    if (direction === 'across') {
      currentCell = board[row][endCounter];
    } else {
      try {
        currentCell = board[endCounter][col];
      } catch (err) {
        currentCell = undefined;
      }
    }
    if (!currentCell || currentCell.style === '#BS#') {
      cell = incOrDec === 'INCREMENT' ? endCounter - 1 : endCounter + 1;
      lookingForCell = false;
      break;
    }
    if (incOrDec === 'INCREMENT') {
      endCounter += 1;
    } else {
      endCounter -= 1;
    }
  }
  return cell;
};

const maxSearchDepth = 200;
export const findNextCell = (
  [row, col]: [number, number],
  direction: string,
  key = direction === 'across' ? 39 : 40,
  board: Array<Array<Cell>>,
  allowBlackSquare = false
): [number, number] => {
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
    }
    if (currentSearchDepth >= maxSearchDepth) {
      console.warn('Max search depth reached for finding valid cell');
      return [-1, -1];
    }
  }
  return [row, col];
};

export interface PlayableCell extends Cell {
  answer: string;
  guess: string;
  number: string;
  clues: [string, string];
}

export const buildSaveableBoard = (
  playableBoard: Array<Array<PlayableCell>>
) => {
  return playableBoard.map((row) => {
    return row.map((cell) => {
      if (cell.answer === '#BS#') {
        return cell.answer;
      }
      return cell.guess;
    });
  });
};
