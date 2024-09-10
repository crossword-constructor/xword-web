import React, { useCallback } from 'react';
import { throttle } from 'lodash';
import { CellComp } from './Cell';
import { Cell } from '../Common/GridPreview';
// import styles from './Board.module.css';
import { BoardContainer } from '../Common/BoardContainer';
import { PlayableCell } from '../Utils/board';

interface BoardProps {
  playableBoard: Array<Array<PlayableCell>>;
  direction: string;
  currentCells: Array<Array<number>>;
  focusedCell: Array<number>;
  dispatch: (action: Record<string, any>) => void;
  isPlaying: boolean;
  revealedCells: Array<Array<number>>;
  isPuzzleRevealed: boolean;
  isPuzzleSolved: boolean;
}
export const Board = ({
  playableBoard,
  direction,
  currentCells,
  focusedCell,
  dispatch,
  isPlaying,
  revealedCells, // consider abstracting this to solveSpace ...Constructable puzzle doesnt have this concept
  isPuzzleRevealed,
  isPuzzleSolved,
}: BoardProps) => {
  const throttledKeyListener = useCallback(
    throttle((keyCode: number, key: string) => {
      console.log({ keyCode, key });
      if (keyCode === 32) {
        dispatch({ type: 'SPACE' });
      } else if (keyCode >= 37 && keyCode <= 40) {
        dispatch({ type: 'NAVIGATE', keyCode });
      } else if (keyCode === 45) {
        dispatch({ type: 'TOGGLE_REBUS' });
      } else if (keyCode >= 45 && keyCode <= 90) {
        if (
          revealedCells.filter(
            (coords: Array<number>) =>
              coords[0] === focusedCell[0] && coords[0] === focusedCell[1]
          ).length > 0
        ) {
          return;
        }
        if (!isPuzzleSolved) dispatch({ type: 'GUESS', key });
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
      }
    }, 50),
    [direction, isPuzzleSolved]
  );

  const keyListener = (event: any) => {
    event.preventDefault();
    const { keyCode, key } = event;
    throttledKeyListener(keyCode, key);
  };
  return (
    <div>
      {/* <Clock play={playing} onClick={() => togglePlaying(!playing)} /> */}
      <div
        role="button"
        tabIndex={-1}
        // @ TODO NEXT // holding down key is causing freezing
        onKeyDown={keyListener}
      >
        <BoardContainer
          rows={playableBoard}
          cellRenderer={(
            cell: PlayableCell,
            rowNum: number,
            colNum: number
          ) => {
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

            const isRevealed =
              isPuzzleRevealed ||
              revealedCells.filter(
                (cells) => cells[0] === rowNum && cells[1] === colNum
              ).length > 0;
            return black ? (
              // eslint-disable-next-line react/no-array-index-key
              <td style={{ background: 'black' }} key={`${rowNum}${colNum}`} />
            ) : (
              <CellComp
                // eslint-disable-next-line react/no-array-index-key
                key={`${rowNum}${colNum}`}
                isHighlighted={isHighlighted}
                isFocused={
                  focusedCell[0] === rowNum && focusedCell[1] === colNum
                }
                isPlaying={isPlaying}
                text={
                  // eslint-disable-next-line no-nested-ternary
                  isPuzzleSolved ? cell.answer : isPlaying ? cell.guess : ''
                }
                number={cell.number}
                style={cell.style}
                // showAnswers={false}
                isRevealed={isRevealed}
                rowLength={playableBoard.length}
                // coords={[rowNum, colNum]}
                click={() =>
                  dispatch({ type: 'SELECT_CELL', cell: [rowNum, colNum] })
                }
              />
            );
          }}
        />
        {/* <table style={{ border: '1px solid blue', width: '100%' }}>
          <tbody className={styles.board}>{rows}</tbody>
        </table> */}
      </div>
    </div>
  );
};
