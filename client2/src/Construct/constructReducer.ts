import {
  findNextCell,
  searchForBoundaryCell,
  recalculateCluesAndNumbers,
  PlayableCell,
} from '../Utils/board';
import { PuzzleReducerState } from '../SolveSpace/puzzleReducer';

export const constructReducer = (
  state: PuzzleReducerState,
  action: Record<string, any>
): PuzzleReducerState => {
  switch (action.type) {
    case 'LOAD_PUZZLE': {
      const { clues, playableBoard, puzzle } = action.payload;
      const currentCells = clues['1A'].cells;
      return {
        ...state,
        playableBoard,
        // puzzle,
        clues,
        isDirty: false,
        direction: 'across',
        isRebusMode: false,
        selection: {
          ...state.selection,
          currentCells,
        },
      };
    }

    case 'SELECT_CLUE': {
      const newDirection =
        action.clue.position.indexOf('D') > -1 ? 'down' : 'across';
      return {
        ...state,
        direction: newDirection,
        selection: {
          focusedCell: action.clue.cells[0],
          currentCells: action.clue.cells,
          currentClues: [
            newDirection === 'across'
              ? action.clue.position
              : state.playableBoard[action.clue.cells[0][0]][
                  action.clue.cells[0][1]
                ].clues?.[0],
            newDirection === 'down'
              ? action.clue.position
              : state.playableBoard[action.clue.cells[0][0]][
                  action.clue.cells[0][1]
                ].clues?.[1],
          ],
        },
      };
    }

    case 'SELECT_CELL': {
      const { cell } = action;
      const { clues, playableBoard, direction, selection } = state;
      let newDirection = direction;
      if (
        selection.focusedCell[0] === cell[0] &&
        selection.focusedCell[1] === cell[1]
      ) {
        newDirection = direction === 'across' ? 'down' : 'across';
      }
      const currentClues = playableBoard[cell[0]][cell[1]].clues;
      const currentCells =
        currentClues !== null
          ? clues[currentClues[newDirection === 'across' ? 0 : 1]].cells
          : [selection.focusedCell];
      return {
        ...state,
        direction: newDirection,
        selection: {
          focusedCell: cell,
          currentCells,
          currentClues: playableBoard[cell[0]][cell[1]].clues,
        },
      };
    }

    case 'NAVIGATE': {
      const { playableBoard, clues, selection } = state;
      const { currentClues, focusedCell } = selection;
      const { keyCode, options } = action;
      const updatedBoard = [...playableBoard];
      const allowBlackSquareNavigation = true; // move to state
      let { currentCells } = selection;
      let nextCell = focusedCell; // Do I need to copy these so React knows its value has changed ? @ todo look into this
      let { direction } = state;
      if (options && options.clearFirst) {
        updatedBoard[focusedCell[0]][focusedCell[1]].guess = '';
      }
      if (keyCode % 2 !== 0 && state.direction === 'down') {
        direction = 'across';
        if (currentClues) {
          currentCells = clues[currentClues[0]].cells;
        } else {
          nextCell = findNextCell(
            focusedCell,
            direction,
            keyCode,
            playableBoard,
            allowBlackSquareNavigation
          );
        }
        if (playableBoard[nextCell[0]][nextCell[1]].style !== '#BS#') {
          currentCells =
            clues[playableBoard[nextCell[0]][nextCell[1]].clues[0]].cells;
        }
      } else if (keyCode % 2 === 0 && state.direction === 'across') {
        direction = 'down';
        if (currentClues) {
          currentCells = clues[currentClues[1]].cells;
        } else {
          nextCell = findNextCell(
            focusedCell,
            direction,
            keyCode,
            playableBoard,
            allowBlackSquareNavigation
          );
        }
        if (playableBoard[nextCell[0]][nextCell[1]].style !== '#BS#') {
          currentCells =
            clues[playableBoard[nextCell[0]][nextCell[1]].clues[1]].cells;
        }
      } else {
        nextCell = findNextCell(
          focusedCell,
          direction,
          keyCode,
          playableBoard,
          allowBlackSquareNavigation
        );
        const [row, col] = nextCell;
        if (!playableBoard[row][col].clues) {
          currentCells = [[row, col]];
        } else {
          currentCells =
            clues[playableBoard[row][col].clues[direction === 'across' ? 0 : 1]]
              .cells;
        }
      }
      if (playableBoard[nextCell[0]][nextCell[1]].style === '#BS#') {
        currentCells = [nextCell];
      }
      console.log({ nextCell });
      return {
        ...state,
        playableBoard: updatedBoard,
        direction,
        isRebusMode: false,
        selection: {
          ...selection,
          currentCells,
          focusedCell: nextCell,
          currentClues: playableBoard[nextCell[0]][nextCell[1]].clues,
        },
      };
    }

    case 'HOME': {
      return goToBoundary('DECREMENT', state);
    }

    case 'END': {
      return goToBoundary('INCREMENT', state);
    }

    case 'TOGGLE_REBUS': {
      const newState = {
        ...state,
        isRebusMode: !state.isRebusMode,
      };
      return newState;
    }

    case 'GUESS': {
      const { playableBoard, selection, direction, clues, isRebusMode } = state;
      const updatedPlayableBoard = [...playableBoard];
      const { focusedCell } = selection;
      const [currentRow, currentCol] = selection.focusedCell;
      let currentGuess = updatedPlayableBoard[currentRow][currentCol].guess;
      currentGuess = isRebusMode
        ? currentGuess + action.key.toUpperCase()
        : action.key.toUpperCase();
      updatedPlayableBoard[currentRow][currentCol].guess = currentGuess;
      const nextCell: [number, number] = isRebusMode
        ? [currentRow, currentCol]
        : findNextCell(
            focusedCell,
            direction,
            direction === 'across' ? 39 : 40,
            playableBoard
          );
      const [row, col] = nextCell;
      const currentCells =
        clues[playableBoard[row][col].clues[direction === 'across' ? 0 : 1]]
          .cells;

      return {
        ...state,
        playableBoard: updatedPlayableBoard,
        isDirty: true,
        selection: {
          ...selection,
          currentCells,
          focusedCell: nextCell,
          currentClues: playableBoard[nextCell[0]][nextCell[1]].clues,
        },
      };
    }

    case 'PAUSE': {
      return {
        ...state,
        isPlaying: false,
      };
    }

    case 'PLAY': {
      return {
        ...state,
        isPlaying: true,
      };
    }

    case 'INSERT_BLACK_SQUARE': {
      const {
        size,
        playableBoard,
        selection: { focusedCell },
      } = state;
      const autoBlackSquares = calculateAutoBlackSquares(
        focusedCell,
        playableBoard
      );
      const blackSquares = [];
      if (playableBoard[focusedCell[0]][focusedCell[1]].style === '#BS#') {
        // remove blacksquare
        playableBoard[focusedCell[0]][focusedCell[1]].style = '';
        const inverseSquare = getInverseSquare(
          focusedCell[0],
          focusedCell[1],
          size as number // size shouldnt be options on state
        );
        playableBoard[inverseSquare[0]][inverseSquare[1]].style = '';
      } else {
        blackSquares.push(focusedCell);
      }
      const allBlackSquares = [...blackSquares, ...autoBlackSquares];
      const inverseSquares = getInverseSquares(allBlackSquares, size as number);
      // Recalculate black sqaures before getting auto inverse black squares
      const newPlayableBoard = updateBlackSquares(
        playableBoard,
        allBlackSquares
      );
      const autoInverseSquares = inverseSquares
        .map((blackSquare) => {
          return calculateAutoBlackSquares(blackSquare, newPlayableBoard);
        })
        .concat()
        .flat()
        .filter((arr) => arr.length > 0);
      const allSquaresAndInverse = [
        ...allBlackSquares,
        ...inverseSquares,
        ...autoInverseSquares,
      ];
      const finalBoard = updateBlackSquares(
        newPlayableBoard,
        allSquaresAndInverse
      );
      const { board, clues } = recalculateCluesAndNumbers(finalBoard);

      // const recaclulateClues(playableBoard)
      return {
        ...state,
        playableBoard: board,
        clues,
        isDirty: true,
      };
    }

    // case 'REVEAL_SQUARE': {
    //   const updatedRevealedCells = [...state.revealedCells];
    //   updatedRevealedCells.push(state.selection.focusedCell);
    //   return { ...state, revealedCells: updatedRevealedCells };
    // }

    // case 'REVEAL_WORD': {
    //   const updatedRevealedCells = [...state.revealedCells].concat(
    //     state.selection.currentCells
    //   );
    //   return { ...state, revealedCells: updatedRevealedCells };
    // }

    // case 'REVEAL_PUZZLE': {
    //   return {
    //     ...state,
    //     isPuzzleRevealed: true,
    //     isPuzzleSolved: true,
    //     isPlaying: false,
    //   };
    // }

    case 'CLEAR_DIRTY': {
      return {
        ...state,
        isDirty: false,
      };
    }
    default:
      break;
  }
  return state;
};

const goToBoundary = (
  incOrDec: string,
  state: PuzzleReducerState
): PuzzleReducerState => {
  const { playableBoard, selection, direction } = state;
  const { focusedCell, currentCells } = selection;
  const next = searchForBoundaryCell(
    focusedCell[0],
    focusedCell[1],
    direction,
    incOrDec,
    playableBoard
  );
  const row = direction === 'down' ? next : focusedCell[0];
  const col = direction === 'across' ? next : focusedCell[1];
  const nextCell: [number, number] = [row, col];
  return {
    ...state,
    selection: {
      currentCells,
      focusedCell: nextCell,
      currentClues: playableBoard[nextCell[0]][nextCell[1]].clues,
    },
  };
};

const getInverseSquares = (
  cells: [number, number][],
  size: number
): [number, number][] => {
  return cells.map((cell) => getInverseSquare(cell[0], cell[1], size));
};

const getInverseSquare = (
  rowIndex: number,
  colIndex: number,
  size: number
): [number, number] => {
  return [size - 1 - rowIndex, size - 1 - colIndex];
};

// Most puzzles don't allow words of length 1 or 2
// if we add a black square into the puzzle that creates 1 or 2 square segements
// we should also fill those in with black squares automatically
const calculateAutoBlackSquares = (
  focusedCell: [number, number],
  playableBoard: PlayableCell[][]
) => {
  const blackSquares1 = calculateBlackSquaresInDirection(
    focusedCell,
    playableBoard,
    'across',
    'DECREMENT'
  );
  const blackSquares2 = calculateBlackSquaresInDirection(
    focusedCell,
    playableBoard,
    'across',
    'INCREMENT'
  );
  const blackSqaures3 = calculateBlackSquaresInDirection(
    focusedCell,
    playableBoard,
    'down',
    'DECREMENT'
  );
  const blackSquares4 = calculateBlackSquaresInDirection(
    focusedCell,
    playableBoard,
    'down',
    'INCREMENT'
  );
  return [
    ...blackSquares1,
    ...blackSquares2,
    ...blackSqaures3,
    ...blackSquares4,
  ];
};

const calculateBlackSquaresInDirection = (
  focusedCell: [number, number],
  playableBoard: PlayableCell[][],
  direction: string,
  incOrDec: string
): [number, number][] => {
  const isAcross = direction === 'across';
  const isIncrement = incOrDec === 'INCREMENT';
  let blackSquares: [number, number][] = [];
  const boundaryCell = searchForBoundaryCell(
    focusedCell[0],
    focusedCell[1],
    direction,
    incOrDec,
    playableBoard
  );
  let diff = 0;
  const coord = isAcross ? focusedCell[1] : focusedCell[0];
  if (isIncrement) {
    diff = boundaryCell - coord;
  } else {
    diff = coord - boundaryCell;
  }
  if (diff < 3) {
    if (isIncrement) {
      for (let i = coord + 1; i <= boundaryCell; i += 1) {
        // if we're adding a new black square we need to check the same rules as the manually inserted black square
        // i.e., does this newly created black square create a segment of length 1 or 2
        const newBlackCell: [number, number] = [
          isAcross ? focusedCell[0] : i,
          isAcross ? i : focusedCell[1],
        ];
        blackSquares.push(newBlackCell);
        const additionalBlackSquares1 = calculateBlackSquaresInDirection(
          newBlackCell,
          playableBoard,
          isAcross ? 'down' : 'across',
          'INCREMENT'
        );
        const additionalBlackSquares2 = calculateBlackSquaresInDirection(
          newBlackCell,
          playableBoard,
          isAcross ? 'down' : 'across',
          'DECREMENT'
        );
        blackSquares = [
          ...blackSquares,
          ...additionalBlackSquares1,
          ...additionalBlackSquares2,
        ];
      }
    } else {
      for (let i = coord - 1; i >= boundaryCell; i -= 1) {
        const newBlackCell: [number, number] = [
          isAcross ? focusedCell[0] : i,
          isAcross ? i : focusedCell[1],
        ];
        blackSquares.push(newBlackCell);
        const additionalBlackSquares1 = calculateBlackSquaresInDirection(
          newBlackCell,
          playableBoard,
          isAcross ? 'down' : 'across',
          'INCREMENT'
        );
        const additionalBlackSquares2 = calculateBlackSquaresInDirection(
          newBlackCell,
          playableBoard,
          isAcross ? 'down' : 'across',
          'DECREMENT'
        );
        blackSquares = [
          ...blackSquares,
          ...additionalBlackSquares1,
          ...additionalBlackSquares2,
        ];
      }
    }
  }
  return blackSquares;
};

const updateBlackSquares = (
  board: PlayableCell[][],
  blackSquares: [number, number][]
) => {
  return board.map((row, i) =>
    row.map((col, j) => {
      let newCol = col;
      blackSquares.forEach((blackSquare) => {
        if (blackSquare[0] === i && blackSquare[1] === j) {
          newCol = { ...col, style: '#BS#' };
        }
      });
      return newCol;
    })
  );
};
