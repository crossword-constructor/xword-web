import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { findNextCell } from './Board.utils';
import styles from './Board.module.css';
import Board from './Board';
import Clues from './Clues';

const puzzleReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PUZZLE': {
      return {
        ...state,
        playableBoard: action.playableBoard,
        clues: action.clues,
        direction: 'across',
        selection: {
          focusedCell: [0, 0],
          currentCells: action.clues['1A'].cells,
          currentClues: ['1A', '1D'],
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
      const { playableBoard, clues, selection } = { ...state };
      const { currentClues, focusedCell } = selection;
      const { keyCode } = action;
      console.log('NAVIAGTE:', keyCode);
      let { currentCells } = selection;
      let nextCell = focusedCell; // Do I need to copy these so React knows its value has changed ? @ todo look into this
      let { direction } = state;
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
        direction,
        selection: {
          ...selection,
          focusedCell: nextCell,
          currentCells,
          currentClues: playableBoard[nextCell[0]][nextCell[1]].clues,
        },
      };
    }
    default:
      break;
  }
};

const Solvespace = ({ puzzle }) => {
  const [state, dispatch] = useReducer(puzzleReducer, {
    playableBoard: [[]],
    clues: {},
    direction: 'across',
    selection: {
      focusedCell: [0, 0],
      currentCells: puzzle.clues['1A'].cells,
      currentClues: [],
    },
  });

  useEffect(() => {
    console.log('loading puzzle');
    dispatch({
      type: 'LOAD_PUZZLE',
      playableBoard: puzzle.playableBoard,
      clues: puzzle.clues,
    });
  }, [puzzle]);
  console.log('rerendering!');
  return (
    <div className={styles.page}>
      {puzzle.title}
      {puzzle.author}
      <div className={styles.container}>
        <Board
          playableBoard={state.playableBoard}
          currentCells={state.selection.currentCells}
          focusedCell={state.selection.focusedCell}
          direction={state.direction}
          selectCell={cell => dispatch({ type: 'SELECT_CELL', cell })}
          navigate={keyCode => dispatch({ type: 'NAVIGATE', keyCode })}
          guess={key => dispatch({ type: 'GUESS', key })}
        />
        <div className={styles.clues}>
          <Clues
            clues={state ? state.clues : {}}
            direction={state.direction}
            currentClues={state.selection.currentClues}
            selectClue={clue => {
              dispatch({ type: 'SELECT_CLUE', clue });
            }}
          />
        </div>
      </div>
    </div>
  );
};

Solvespace.propTypes = {
  puzzle: PropTypes.shape({
    playableBoard: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          guess: PropTypes.string,
          answer: PropTypes.string.isRequired,
          number: PropTypes.number,
          clues: PropTypes.arrayOf(PropTypes.string),
        })
      )
    ).isRequired,
    clues: PropTypes.shape({
      answer: PropTypes.string,
      clue: PropTypes.string,
      position: PropTypes.string,
      cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    }).isRequired,
  }).isRequired,
};

export default Solvespace;
