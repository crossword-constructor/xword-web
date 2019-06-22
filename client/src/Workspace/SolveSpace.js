import React, { useReducer, useEffect } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import puzzleReducer from './puzzleReducer';
import Sidebar from '../Layouts/Sidebar';
import styles from './SolveSpace.module.css';
import Board from './Board';
import Clues from './Clues';

const UPDATE_PLAYER_BOARD = gql`
  mutation updatePlayerBoard($board: [[String!]]) {
    updatePlayerBoard(board: $board)
  }
`;

const Solvespace = ({ puzzle, client }) => {
  const [state, dispatch] = useReducer(puzzleReducer, {
    playableBoard: [[]],
    clues: {},
    direction: 'across',
    selection: {
      focusedCell: [0, 0],
      currentCells: puzzle.clues['1A'].cells,
      currentClues: null,
    },
  });

  useEffect(() => {
    dispatch({
      type: 'LOAD_PUZZLE',
      playableBoard: puzzle.playableBoard,
      clues: puzzle.clues,
    });
    return () => {
      console.log(client);
      client.mutate(UPDATE_PLAYER_BOARD);
    };
  }, [puzzle]);

  useEffect(() => {
    console.log('playableboard has changed');
    console.log(client);
  }, [state.playableBoard]);

  const { selection, direction } = state;
  const { currentClues } = selection;
  return (
    <div className={styles.page}>
      <div>
        {puzzle.title}
        {puzzle.author}
      </div>
      <Sidebar
        breakPointPercent={40}
        sideBar={
          <>
            <div className={styles.focusedClue}>
              <span className={styles.focusedCluePosition}>
                {currentClues
                  ? currentClues[direction === 'across' ? 0 : 1]
                  : null}
              </span>
              {currentClues
                ? puzzle.clues[currentClues[direction === 'across' ? 0 : 1]]
                    .clue.text
                : null}
            </div>
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
          </>
        }
        mainContent={
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
        }
      />
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
  client: PropTypes.shape({}).isRequired,
};

export default Solvespace;
