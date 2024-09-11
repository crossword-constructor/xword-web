import React, { useState, useReducer, createContext, useEffect } from 'react';
import styled from '@emotion/styled';
import { Setup } from './Setup';
import { Page } from '../Shared/Common';
import ConstructBoard from './ConstructBoard';
import constructReducer from './constructReducer';
import { buildConstructableBoard } from '../Workspace/Board.utils';
import SidePanel from './SidePanel';
import undoable from '../Utils/undoableReducer';
// import useKeyDownMap from '../Hooks/useKeyDownMap';

const Construct = () => {
  const [size, setSize] = useState(15);
  const { constructableBoard, clues } = buildConstructableBoard(size);
  const [state, dispatch] = useReducer(constructReducer, {
    playableBoard: constructableBoard,
    clues,
    direction: 'across',
    size,
    selection: {
      focusedCell: [0, 0],
      currentCells: ['A'],
      currentClues: ['1A', '1D'],
    },
    isPlaying: false,
    isDirty: false,
  });
  const PuzzleContext = createContext();
  console.log({ state });

  // const keyDownMap = useKeyDownMap();
  // console.log({ keyDownMap });

  // load puzzle when size is selected
  return (
    <PuzzleContext.Provider value={{ state, dispatch }}>
      <Page>
        {size === null && <Setup />}
        <Workspace>
          <div style={{ width: '100%' }}>
            <ConstructBoard size={size} dispatch={dispatch} {...state} />
          </div>
          <SidePanel />
        </Workspace>
      </Page>
    </PuzzleContext.Provider>
  );
};

const Workspace = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-grow: 1;
`;

export default Construct;
