import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
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
          // @TODO this is hardcoded for across clues...need to make it dynamic based on direction
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
      // @TODO logic for switching direction if action.cell === state.selection.currentCell then switch direction
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
    dispatch({
      type: 'LOAD_PUZZLE',
      playableBoard: puzzle.playableBoard,
      clues: puzzle.clues,
    });
  }, [puzzle]);
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
          navigate={event => dispatch({ type: 'NAVIGATE', event })}
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
  puzzle: PropTypes.shape({}).isRequired,
};

export default Solvespace;
