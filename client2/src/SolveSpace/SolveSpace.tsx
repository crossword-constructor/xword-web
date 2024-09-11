import React, { useReducer, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import debounce from 'lodash/debounce';
import { useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { GET_PUZZLE } from './solveSpace.gql';
import { puzzleReducer, PuzzleReducerState } from './puzzleReducer';
import { buildSaveableBoard, buildPlayableBoard } from '../Utils/board';
import { Clues } from './Clues';
// import Sidebar from '../Layouts/Sidebar';
// import Modal from '../Shared/Modal';
// import Button from '../Shared/Button';
// import Toolbar from './Toolbar';
import { Board } from '../Board/Board';
// import Clues from './Clues';
// import Clock from './Clock';
// import DropdownMenu from '../Shared/DropdownMenu';

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
const initialState: PuzzleReducerState = {
  playableBoard: [[]],
  clues: {},
  direction: 'across',
  selection: {
    focusedCell: [0, 0],
    currentCells: [[0, 0]],
    currentClues: ['1A', '1D'],
  },
  revealedCells: [],
  isPlaying: false,
  isDirty: false,
  isRebusMode: false,
  isPuzzleRevealed: false,
  isPuzzleSolved: false,
  isLoaded: false,
};
export const SolveSpace = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [state, dispatch] = useReducer(puzzleReducer, initialState);
  const {
    playableBoard,
    clues,
    selection,
    direction,
    isPlaying,
    // time,
    isLoaded,
    isDirty,
  } = state;

  const debouncedSave = useCallback(
    debounce(
      async (board) => {
        try {
          // await updateUserPuzzle({
          //   variables: {
          //     _id: id,
          //     board: buildSaveableBoard(board),
          //   },
          // });
          // dispatch({ type: 'CLEAR_DIRTY' });
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
  useEffect(() => {
    if (isDirty) {
      debouncedSave(playableBoard);
    }
  }, [playableBoard, isDirty, debouncedSave]);
  const [updateUserPuzzle] = useMutation(UPDATE_PLAYER_BOARD);
  useQuery(GET_PUZZLE, {
    variables: { puzzleId: id },
    onCompleted: (data) => {
      const {
        playablePuzzle: { puzzle: p, userPuzzle },
      } = data;
      console.log('');
      const playablePuzzle = buildPlayableBoard(p, userPuzzle);
      console.log({ playableBoard });
      dispatch({
        type: 'LOAD_PUZZLE',
        payload: playablePuzzle,
      });
    },
  });
  console.log({ state });
  // useEffect(() => {
  //   if (playableBoard) {
  //     debouncedSave(playableBoard);
  //   }
  // }, [playableBoard, debouncedSave]);

  const updateRevealed = (scope: any) => {
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
  // const revealedCells = [];
  // console.log(puzzle.clues[currentClues[direction === 'across' ? 0 : 1]]);
  if (!isLoaded) return <div>loading</div>;
  // const { title, author } = puzzle;
  return (
    // <div className={styles.page}>
    //   <Modal
    //     isOpen={!isPlaying && !isSolved}
    //     close={() => dispatch({ type: 'PLAY' })}
    //   >
    //     <Button
    //       theme="Light"
    //       onClick={() => {
    //         dispatch({ type: 'PLAY' });
    //       }}
    //     >
    //       {time === 0 ? 'start' : 'resume'}
    //     </Button>
    //   </Modal>
    //   <Toolbar
    //     DropdownMenu={
    //       <DropdownMenu
    //         name="Reveal"
    //         list={[
    //           {
    //             name: 'square',
    //             onClick: () => updateRevealed('square'),
    //           },
    //           {
    //             name: 'word',
    //             onClick: () => updateRevealed('word'),
    //           },
    //           {
    //             name: 'puzzle',
    //             onClick: () => updateRevealed('puzzle'),
    //           },
    //         ]}
    //         offSet={18}
    //       />
    //     }
    //   />
    <Wrapper>
      <div>
        <FocusedClue $isHidden={!isPlaying}>
          <FocusedCluePosition>
            {currentClues ? currentClues[direction === 'across' ? 0 : 1] : null}
          </FocusedCluePosition>
          {currentClues
            ? clues[currentClues[direction === 'across' ? 0 : 1]].clue.text
            : null}
        </FocusedClue>
        {playableBoard ? (
          <Board
            isPlaying={isSolved || isPlaying}
            playableBoard={playableBoard}
            revealedCells={[]}
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
          selectClue={(clue) => {
            dispatch({ type: 'SELECT_CLUE', clue });
          }}
        />
      ) : null}
    </Wrapper>
    // </div>
  );
};

const Wrapper = styled.div`
  margin-top: var(--s-2);
  display: grid;
  width: 100%;
  /* border: 2px solid pink; */
  grid-template-columns: 1.15fr minmax(min-content, 1fr);
  grid-template-rows: 88vh;
  grid-column-gap: var(--s-2);
  border: 1px solid green;
`;

const Left = styled.div``;

interface FocusedClueProps {
  $isHidden: boolean;
}
const FocusedClue = styled.div<FocusedClueProps>`
  background: blue;
  padding: 10;
  font-size: 10;
  margin-bottom: 10;
  transition: 0.2s;
  /* isHidden color: var(--highlightBlue); */
`;

const FocusedCluePosition = styled.div`
  font-weight: 700;
  margin-right: var(--s-1);
`;
