import { findNextCell, searchForBoundaryCell } from './Board.utils';

export default (state, action) => {
  switch (action.type) {
    case 'LOAD_PUZZLE': {
      const { clues, playableBoard, puzzle } = action.payload;
      const currentCells = clues['1A'].cells;
      return {
        ...state,
        playableBoard,
        puzzle,
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
                ].clues[0],
            newDirection === 'down'
              ? action.clue.position
              : state.playableBoard[action.clue.cells[0][0]][
                  action.clue.cells[0][1]
                ].clues[1],
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
      console.log({
        clues,
        playableBoard,
        cell,
        current: playableBoard[cell[0]][cell[1]],
      });
      return {
        ...state,
        direction: newDirection,
        selection: {
          focusedCell: cell,
          currentCells:
            clues[
              playableBoard[cell[0]][cell[1]].clues[
                newDirection === 'across' ? 0 : 1
              ]
            ].cells,
          currentClues: playableBoard[cell[0]][cell[1]].clues,
        },
      };
    }

    case 'NAVIGATE': {
      const { playableBoard, clues, selection } = state;
      const { currentClues, focusedCell } = selection;
      const { keyCode, options } = action;
      const updatedBoard = [...playableBoard];
      let { currentCells } = selection;
      let nextCell = focusedCell; // Do I need to copy these so React knows its value has changed ? @ todo look into this
      let { direction } = state;
      if (options && options.clearFirst) {
        updatedBoard[focusedCell[0]][focusedCell[1]].guess = '';
      }
      if (keyCode % 2 !== 0 && state.direction === 'down') {
        direction = 'across';
        currentCells = clues[currentClues[0]].cells;
      } else if (keyCode % 2 === 0 && state.direction === 'across') {
        direction = 'down';
        currentCells = clues[currentClues[1]].cells;
      } else {
        nextCell = findNextCell(focusedCell, direction, keyCode, playableBoard);
        const [row, col] = nextCell;
        currentCells =
          clues[playableBoard[row][col].clues[direction === 'across' ? 0 : 1]]
            .cells;
      }
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
      const nextCell = isRebusMode
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

    case 'REVEAL_SQUARE': {
      const updatedRevealedCells = [...state.revealedCells];
      updatedRevealedCells.push(state.selection.focusedCell);
      return { ...state, revealedCells: updatedRevealedCells };
    }

    case 'REVEAL_WORD': {
      const updatedRevealedCells = [...state.revealedCells].concat(
        state.selection.currentCells
      );
      return { ...state, revealedCells: updatedRevealedCells };
    }

    case 'REVEAL_PUZZLE': {
      return {
        ...state,
        isPuzzleRevealed: true,
        isPuzzleSolved: true,
        isPlaying: false,
      };
    }

    case 'CLEAR_DIRTY': {
      return {
        ...state,
        isDirty: false,
      };
    }
    default:
      break;
  }
};

const goToBoundary = (incOrDec, state) => {
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
  const nextCell = [row, col];
  return {
    ...state,
    selection: {
      currentCells,
      focusedCell: nextCell,
      currentClues: playableBoard[nextCell[0]][nextCell[1]].clues,
    },
  };
};
