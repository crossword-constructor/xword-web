import React, { useReducer, useEffect, useCallback } from 'react';
import { withApollo } from 'react-apollo';
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
import DropdownMenu from '../Shared/DropdownMenu';

const UPDATE_PLAYER_BOARD = gql`
  mutation updateUserPuzzle(
    $_id: ID!
    $board: [[String!]]
    $revealedCells: [[Float]]
    $isRevealed: Boolean
    $isSolved: Boolean
  ) {
    updateUserPuzzle(
      _id: $_id
      board: $board
      revealedCells: $revealedCells
      isRevealed: $isRevealed
      isSolved: $isSolved
    ) {
      _id
      board
      time
      revealedCells
      isRevealed
      isSolved
    }
  }
`;

const Solvespace = ({
  puzzle,
  userPuzzle,
  time,
  revealedCells,
  isRevealed = false,
  isSolved = false,
  client,
}) => {
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
  });

  const { playableBoard, clues, selection, direction, isPlaying } = state;

  useEffect(() => {
    dispatch({
      type: 'LOAD_PUZZLE',
      playableBoard: puzzle.playableBoard,
      clues: puzzle.clues,
      time,
    });
  }, []);

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
      debouncedSave(playableBoard);
    }
  }, [playableBoard]);

  const updateRevealed = scope => {
    let updatedRevealedCells = [...revealedCells];
    const { currentCells, focusedCell } = selection;
    if (scope === 'puzzle') {
      isRevealed = true;
      isSolved = true;
    } else if (scope === 'word') {
      updatedRevealedCells = updatedRevealedCells.concat(currentCells);
    } else if (scope === 'square') {
      updatedRevealedCells.push(focusedCell);
    }
    client.mutate({
      mutation: UPDATE_PLAYER_BOARD,
      variables: {
        _id: userPuzzle,
        revealedCells: updatedRevealedCells,
        isRevealed,
        isSolved,
      },
    });
  };
  const { currentClues } = selection;
  const { title, author } = puzzle;
  return (
    <div className={styles.page}>
      <Modal
        isOpen={!isPlaying && !isSolved}
        close={() => dispatch({ type: 'PLAY' })}
      >
        <Button
          theme="Light"
          onClick={() => {
            dispatch({ type: 'PLAY' });
          }}
        >
          {time === 0 ? 'start' : 'resume'}
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
              userPuzzleId={userPuzzle}
            />
          }
          DropdownMenu={
            <DropdownMenu
              name="Reveal"
              list={[
                {
                  name: 'square',
                  onClick: () => updateRevealed('square'),
                },
                {
                  name: 'word',
                  onClick: () => updateRevealed('word'),
                },
                {
                  name: 'puzzle',
                  onClick: () => updateRevealed('puzzle'),
                },
              ]}
              offSet={18}
            />
          }
        />
        <Sidebar
          heightsAreEqual
          breakPointPercent={40}
          sideBar={
            <div className={styles.left}>
              <div
                className={
                  isPlaying || isSolved ? styles.focusedClue : styles.hiddenClue
                }
              >
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
                  isPlaying={isSolved || isPlaying}
                  playableBoard={playableBoard}
                  revealedCells={revealedCells}
                  isPuzzleRevealed={isRevealed}
                  isPuzzleSolved={isSolved}
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
                  isPlaying={isPlaying || isSolved}
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
  time: PropTypes.number.isRequired,
  revealedCells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  isRevealed: PropTypes.bool,
  isSolved: PropTypes.bool,
  client: PropTypes.shape({}).isRequired,
};

Solvespace.defaultProps = {
  isRevealed: false,
  isSolved: false,
  revealedCells: [],
};

export default withApollo(Solvespace);
