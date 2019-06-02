import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Board.module.css';
import Board from './Board';
import Clues from './Clues';

const puzzleReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_PUZZLE': {
      console.log('action.board: ', action.playableBoard);
      return { playableBoard: action.playableBoard, clues: action.clues };
    }
    default:
      break;
  }
};

const Solvespace = ({ puzzle }) => {
  const [state, dispatch] = useReducer(puzzleReducer, {
    board: [[]],
    clues: {},
    selection: {},
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
          currentClue="1A"
          setClue={() => {}}
        />
        <div className={styles.clues}>
          <Clues
            clues={state ? state.clues : {}}
            currentClue="1A"
            setClue={() => {}}
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
