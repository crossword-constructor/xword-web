import { findNextCell } from './Board.utils';

export default (state, action) => {
  switch (action.type) {
    case 'LOAD_PUZZLE': {
      return {
        ...state,
        playableBoard: action.playableBoard,
        clues: action.clues,
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
        selection: {
          ...selection,
          currentCells,
          focusedCell: nextCell,
          currentClues: playableBoard[nextCell[0]][nextCell[1]].clues,
        },
      };
    }

    case 'GUESS': {
      const { playableBoard, selection, direction, clues } = state;
      const updatedPlayableBoard = [...playableBoard];
      const { focusedCell } = selection;
      const [currentRow, currentCol] = selection.focusedCell;
      updatedPlayableBoard[currentRow][
        currentCol
      ].guess = action.key.toUpperCase();
      const nextCell = findNextCell(
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
        selection: {
          ...selection,
          currentCells,
          focusedCell: nextCell,
          currentClues: playableBoard[nextCell[0]][nextCell[1]].clues,
        },
      };
    }
    default:
      break;
  }
};
