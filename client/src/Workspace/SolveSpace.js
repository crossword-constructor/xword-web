import React, { useReducer, useEffect, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { useParams } from 'react-router-dom';
import { GET_PUZZLE } from '../Utils/queries';
import puzzleReducer from './puzzleReducer';
import { buildSaveableBoard, buildPlayableBoard } from './Board.utils';
// import Sidebar from '../Layouts/Sidebar';
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
      board {
        text
        style
      }
      time
      revealedCells
      isRevealed
      isSolved
    }
  }
`;

const Solvespace = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(puzzleReducer, {
    playableBoard: null,
    clues: {},
    direction: 'across',
    selection: {
      focusedCell: [0, 0],
      currentCells: ['A'],
      currentClues: ['1A', '1D'],
    },
    isPlaying: false,
    isDirty: false,
  });

  const {
    playableBoard,
    clues,
    selection,
    direction,
    isPlaying,
    time,
    isDirty,
  } = state;
  useEffect(() => {
    if (isDirty) {
      debouncedSave(playableBoard);
    }
  }, [playableBoard, isDirty, debouncedSave]);
  const [updateUserPuzzle] = useMutation(UPDATE_PLAYER_BOARD);
  useQuery(GET_PUZZLE, {
    variables: { puzzleId: id },
    onCompleted: data => {
      const {
        playablePuzzle: {
          playablePuzzle: { puzzle: p, userPuzzle },
        },
      } = data;
      const playablePuzzle = buildPlayableBoard(p, userPuzzle);
      dispatch({
        type: 'LOAD_PUZZLE',
        payload: playablePuzzle,
      });
    },
  });

  const debouncedSave = useCallback(
    debounce(
      async board => {
        try {
          await updateUserPuzzle({
            variables: {
              _id: id,
              board: buildSaveableBoard(board),
            },
          });
          dispatch({ type: 'CLEAR_DIRTY' });
        } catch (err) {
          console.log({ err });
        }
        // client.mutate({
        //   mutation: UPDATE_PLAYER_BOARD,
        //   variables: {
        //     _id: userPuzzle,
        //     board: buildSaveableBoard(board),
        //   },
        // });
      },
      1000,
      { leading: true }
    ),
    []
  );

  // useEffect(() => {
  //   if (playableBoard) {
  //     debouncedSave(playableBoard);
  //   }
  // }, [playableBoard, debouncedSave]);

  const updateRevealed = scope => {
    // move this logic to reducer
    // let updatedRevealedCells = [...revealedCells];
    // const { currentCells, focusedCell } = selection;
    // if (scope === 'puzzle') {
    //   isRevealed = true;
    //   isSolved = true;
    // } else if (scope === 'word') {
    //   updatedRevealedCells = updatedRevealedCells.concat(currentCells);
    // } else if (scope === 'square') {
    //   updatedRevealedCells.push(focusedCell);
    // }
    // client.mutate({
    //   mutation: UPDATE_PLAYER_BOARD,
    //   variables: {
    //     _id: userPuzzle,
    //     revealedCells: updatedRevealedCells,
    //     isRevealed,
    //     isSolved,
    //   },
    // });
  };
  if (!playableBoard) return <div>loading</div>;
  const { currentClues } = selection;
  const isSolved = false;
  const isRevealed = false;
  const revealedCells = [];
  console.log({ ...state });
  // console.log(puzzle.clues[currentClues[direction === 'across' ? 0 : 1]]);
  // const { title, author } = puzzle;
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
      <Toolbar
        // title={title}
        // author={author}
        // Clock={
        //   <Clock
        //     time={time}
        //     isPlaying={isPlaying}
        //     pause={() => dispatch({ type: 'PAUSE' })}
        //     userPuzzleId={userPuzzle}
        //   />
        // }
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
      <div className={styles.wrapper}>
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
              ? clues[currentClues[direction === 'across' ? 0 : 1]].clue.text
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
              dispatch={dispatch}
            />
          ) : null}
        </div>
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
    </div>
  );
};

Solvespace.propTypes = {};

Solvespace.defaultProps = {};

export default Solvespace;
