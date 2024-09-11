import React, { useState, useReducer, createContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { Setup } from './Setup';
// import { Page } from '../Shared/Common';
import { ConstructBoard } from './ConstructBoard';
import { constructReducer } from './constructReducer';
import { SidePanel } from './SidePanel';
// import undoable from '../Utils/undoableReducer';
import { buildConstructableBoard } from '../Utils/board';
import { PuzzleReducerState } from '../SolveSpace/puzzleReducer';
import { WorkspaceContextProvider } from './WorkspaceContext';
// import useKeyDownMap from '../Hooks/useKeyDownMap';

export const Workspace = () => {
  const initialSize = 15;
  // const [size, setSize] = useState(15);
  const { constructableBoard, clues } = buildConstructableBoard(initialSize);
  const initialState: PuzzleReducerState = {
    playableBoard: constructableBoard,
    clues,
    direction: 'across',
    size: initialSize,
    selection: {
      focusedCell: [0, 0],
      currentCells: [[0, 0]],
      currentClues: ['1A', '1D'],
    },
    isPlaying: false,
    isDirty: false,
    isRebusMode: false,
    isPuzzleRevealed: false,
    isPuzzleSolved: true,
    isLoaded: false,
    revealedCells: [],
  };
  const [state, dispatch] = useReducer(constructReducer, initialState);

  // const keyDownMap = useKeyDownMap();
  // console.log({ keyDownMap });

  // load puzzle when size is selected
  return (
    <WorkspaceContextProvider value={{ state, dispatch }}>
      {/* <Page> */}
      {/* {initialSize === null && <Setup />} */}
      <Container>
        <div style={{ width: '45%' }}>
          <ConstructBoard size={initialSize} dispatch={dispatch} {...state} />
        </div>
        <SidePanel />
      </Container>
      {/* </Page> */}
    </WorkspaceContextProvider>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 0 120px;
  /* height: 100%; */
  width: 100%;
  flex-grow: 1;
  justify-content: space-between;
`;
