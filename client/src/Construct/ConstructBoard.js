import React, { useCallback } from 'react';
import throttle from 'lodash.throttle';
import Board from '../Workspace/Board';
import { buildConstructableBoard } from '../Workspace/Board.utils';
import { BoardContainer } from '../Shared/Common';
import Cell from '../Workspace/Board.cell';

const ConstructionBoard = ({
  selection,
  playableBoard: constructableBoard,
  direction,
  dispatch,
}) => {
  const { currentCells, focusedCell } = selection;
  const throttledKeyListener = useCallback(
    throttle((keyCode, key) => {
      console.log({ keyCode, key });
      if (keyCode === 32) {
        dispatch({ type: 'SPACE' });
      } else if (keyCode >= 37 && keyCode <= 40) {
        dispatch({ type: 'NAVIGATE', keyCode });
      } else if (keyCode === 45) {
        dispatch({ type: 'TOGGLE_REBUS' });
      } else if (keyCode >= 45 && keyCode <= 90) {
        // if (
        //   revealedCells.filter(
        //     coords =>
        //       coords[0] === focusedCell[0] && coords[0] === focusedCell[1]
        //   ).length > 0
        // ) {
        //   return;
        // }
        dispatch({ type: 'GUESS', key });
      } else if (keyCode === 8) {
        dispatch({
          type: 'NAVIGATE',
          keyCode: direction === 'across' ? 37 : 38,
          options: { clearFirst: true },
        });
      } else if (key === 'Home') {
        dispatch({ type: 'HOME' });
      } else if (key === 'End') {
        dispatch({ type: 'END' });
      } else if (key === '.') {
        dispatch({ type: 'INSERT_BLACK_SQUARE' });
      }
    }, 50),
    [direction]
  );

  const keyListener = event => {
    event.preventDefault();
    const { keyCode, key } = event;
    throttledKeyListener(keyCode, key);
  };
  return (
    <div
      role="button"
      tabIndex="-1"
      // @ TODO NEXT // holding down key is causing freezing
      onKeyDown={keyListener}
    >
      <BoardContainer
        rows={constructableBoard}
        cellRenderer={(cell, rowNum, colNum) => {
          const black = cell.style === '#BS#';
          let isHighlighted = false;

          currentCells.some(coords => {
            // console.log('coords: ', coords);
            if (coords[0] === rowNum && coords[1] === colNum) {
              isHighlighted = true;
              return true;
            }
            return false;
          });

          // const isRevealed =
          //   isPuzzleRevealed ||
          //   revealedCells.filter(
          //     cells => cells[0] === rowNum && cells[1] === colNum
          //   ).length > 0;
          return black ? (
            // eslint-disable-next-line react/no-array-index-key
            <td
              style={{ backgroundColor: 'black' }}
              key={`${rowNum}${colNum}`}
            />
          ) : (
            <Cell
              // eslint-disable-next-line react/no-array-index-key
              key={`${rowNum}${colNum}`}
              isHighlighted={isHighlighted}
              isFocused={focusedCell[0] === rowNum && focusedCell[1] === colNum}
              isPlaying
              text={cell.guess}
              number={cell.number}
              style={cell.style}
              showAnswers={false}
              rowLength={constructableBoard.length}
              coords={[rowNum, colNum]}
              click={() =>
                dispatch({ type: 'SELECT_CELL', cell: [rowNum, colNum] })
              }
            />
          );
        }}
      />
    </div>
  );
};

export default ConstructionBoard;
