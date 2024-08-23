import React, { useState, useReducer } from 'react';
import { Setup } from './Setup';
import { Page } from '../Shared/Common';
import ConstructBoard from './ConstructBoard';
import constructReducer from './constructReducer';
import { buildConstructableBoard } from '../Workspace/Board.utils';

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
  console.log({ state });

  // load puzzle when size is selected
  return (
    <Page>
      {size === null && <Setup />}
      <ConstructBoard size={size} dispatch={dispatch} {...state} />
    </Page>
  );
};

export default Construct;
