import React, { useReducer, useEffect } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import puzzleReducer from './puzzleReducer';
import { buildSaveableBoard } from './Board.utils';
import Sidebar from '../Layouts/Sidebar';
import styles from './SolveSpace.module.css';
import Board from './Board';
import Clues from './Clues';

const UPDATE_PLAYER_BOARD = gql`
  mutation updatePlayerBoard($puzzleId: ID!, $board: [[String!]]) {
    updatePlayerBoard(puzzleId: $puzzleId, board: $board) {
      message
    }
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

  const { playableBoard, clues, selection, direction } = state;

  useEffect(() => {
    dispatch({
      type: 'LOAD_PUZZLE',
      playableBoard: puzzle.playableBoard,
      clues: puzzle.clues,
    });
  }, [puzzle]);

  useEffect(() => {
    return () => {
      client
        .mutate({
          mutation: UPDATE_PLAYER_BOARD,
          variables: {
            board: buildSaveableBoard(state.playableBoard),
            puzzleId: puzzle._id,
          },
        })
        .then(result => {
          console.log(result);
        })
        .catch(err => console.log({ err }));
    };
  }, []); // The dependency here is the route?? because we want this to
  //  fire when the user leaves, but a case could be made for playableBaord
  //  as well because if that doesnt change we dont want to run the mutation...but
  // we also dont want to run it every time the board updates // maybe we do an we could debounce it and then we 're
  // saving every time the user pauses typing...has the added benefit of not failing due to loss of conneciton

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
              playableBoard={playableBoard}
              currentCells={selection.currentCells}
              focusedCell={selection.focusedCell}
              direction={direction}
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
              clues={clues}
              direction={direction}
              currentClues={selection.currentClues}
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
    _id: PropTypes.string.isRequired,
  }).isRequired,
  client: PropTypes.shape({}).isRequired,
};

export default Solvespace;
