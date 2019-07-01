import React, { useReducer, useEffect, useCallback } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import puzzleReducer from './puzzleReducer';
import { buildSaveableBoard } from './Board.utils';
import Sidebar from '../Layouts/Sidebar';
import styles from './SolveSpace.module.css';
import Modal from '../Shared/Modal';
import Button from '../Shared/Button';
import Toolbar from './Toolbar';
import Board from './Board';
import Clues from './Clues';
import Clock from './Clock';

const UPDATE_PLAYER_BOARD = gql`
  mutation updateUserPuzzle($_id: ID!, $board: [[String!]]) {
    updateUserPuzzle(_id: $_id, board: $board) {
      _id
      board
    }
  }
`;

const Solvespace = ({ puzzle, userPuzzle, client }) => {
  const [state, dispatch] = useReducer(puzzleReducer, {
    playableBoard: null,
    clues: {},
    direction: 'across',
    selection: {
      focusedCell: [0, 0],
      currentCells: puzzle.clues['1A'].cells,
      currentClues: ['1A', '1D'],
    },
    isPlaying: false,
    time: 0,
    startTime: 1000,
  });

  const {
    playableBoard,
    clues,
    selection,
    direction,
    isPlaying,
    startTime,
    time,
  } = state;

  useEffect(() => {
    dispatch({
      type: 'LOAD_PUZZLE',
      playableBoard: puzzle.playableBoard,
      clues: puzzle.clues,
    });
  }, [puzzle]);

  // Clock
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        dispatch({ type: 'increment' });
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [startTime, isPlaying]);

  const debouncedSave = useCallback(
    debounce(board => {
      client.mutate({
        mutation: UPDATE_PLAYER_BOARD,
        variables: {
          _id: userPuzzle,
          board: buildSaveableBoard(board),
        },
      });
    }, 1000),
    []
  );

  useEffect(() => {
    if (playableBoard) {
      // debouncedSave.cancel();
      debouncedSave(playableBoard);
    }
  }, [playableBoard]);

  // const save = () => {}; // The dependency here is the route?? because we want this to
  //  fire when the user leaves, but a case could be made for playableBaord
  //  as well because if that doesnt change we dont want to run the mutation...but
  // we also dont want to run it every time the board updates // maybe we do an we could debounce it and then we 're
  // saving every time the user pauses typing...has the added benefit of not failing due to loss of conneciton

  const { currentClues } = selection;
  const { title, author } = puzzle;
  return (
    <div className={styles.page}>
      <Modal isOpen={!isPlaying} close={() => dispatch({ type: 'PLAY' })}>
        <Button
          theme="Light"
          onClick={() => {
            dispatch({ type: 'PLAY' });
          }}
        >
          Start
        </Button>
      </Modal>
      <div className={styles.container}>
        <Toolbar
          title={title}
          author={author}
          Clock={
            <Clock
              time={time}
              isPlaying={isPlaying}
              pause={() => dispatch({ type: 'PAUSE' })}
            />
          }
        />
        <Sidebar
          heightsAreEqual
          breakPointPercent={40}
          sideBar={
            <div className={styles.left}>
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
              {playableBoard ? (
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
              ) : null}
            </div>
          }
          mainContent={
            <div className={styles.clues}>
              {currentClues ? (
                <Clues
                  clues={clues}
                  direction={direction}
                  currentClues={selection.currentClues}
                  selectClue={clue => {
                    dispatch({ type: 'SELECT_CLUE', clue });
                  }}
                />
              ) : null}
            </div>
          }
        />
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
        }).isRequired
      ).isRequired
    ).isRequired,
    clues: PropTypes.shape({
      answer: PropTypes.string,
      clue: PropTypes.string,
      position: PropTypes.string,
      cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    }).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  userPuzzle: PropTypes.string.isRequired,
  client: PropTypes.shape({}).isRequired,
};

export default Solvespace;
