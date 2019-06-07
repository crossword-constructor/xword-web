import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import puzzleReducer from './puzzleReducer';
import styles from './Board.module.css';
import Board from './Board';
import Clues from './Clues';

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
          navigate={(keyCode, options) =>
            dispatch({ type: 'NAVIGATE', keyCode, options })
          }
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
