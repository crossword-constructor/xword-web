import React, { useCallback, useEffect } from 'react';
import throttle from 'lodash/throttle';
// import Board from '../Workspace/Board';
// import { buildConstructableBoard } from '../utils/board';
import { BoardContainer } from '../Common/BoardContainer';
import { CellComp } from '../Board/Cell';
// import Cell from '../Workspace/Board.cell';
import { SelectionState } from '../SolveSpace/puzzleReducer';
import { PlayableCell } from '../Utils/board';

interface ConstructBoardProps {
  selection: SelectionState;
  playableBoard: PlayableCell[][];
  direction: string;
  dispatch: (payload: Record<string, any>) => void;
}
export const ConstructBoard = ({
  selection,
  playableBoard: constructableBoard,
  direction,
  dispatch,
}: ConstructBoardProps) => {
  const { currentCells, focusedCell } = selection;
  const throttledKeyListener = useCallback(
    throttle((keyCode: number, key: string) => {
      if (keyCode === 32) {
        dispatch({ type: 'SPACE' });
      } else if (keyCode >= 37 && keyCode <= 40) {
        dispatch({ type: 'NAVIGATE', keyCode });
      } else if (keyCode === 45) {
        dispatch({ type: 'TOGGLE_REBUS' });
      } else if (keyCode >= 45 && keyCode <= 90) {
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

  const keyListener = (event: any) => {
    event.preventDefault();
    const { keyCode, key } = event;
    throttledKeyListener(keyCode, key);
  };
  // useEffect(() => {
  //   window.addEventListener('keydown', keyListener);
  // }, [throttledKeyListener]);

  // console.log({ keyListener });
  return (
    <div
      role="button"
      tabIndex={-1}
      // @ TODO NEXT // holding down key is causing freezing
      onKeyDown={(e) => {
        keyListener(e);
      }}
    >
      <BoardContainer
        rows={constructableBoard}
        cellRenderer={(cell: PlayableCell, rowNum: number, colNum: number) => {
          const black = cell.style === '#BS#';
          let isHighlighted = false;

          currentCells.some((coords) => {
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
          return (
            <CellComp
              key={`${rowNum}${colNum}`}
              isHighlighted={isHighlighted}
              isFocused={focusedCell[0] === rowNum && focusedCell[1] === colNum}
              isPlaying
              text={
                cell.guess
                // eslint-disable-next-line no-nested-ternary
                // isPuzzleSolved ? cell.answer : isPlaying ? cell.guess : ''
              }
              number={cell.number}
              style={cell.style}
              // showAnswers={false}
              isRevealed={false}
              rowLength={constructableBoard.length}
              // coords={[rowNum, colNum]}
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
