import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import Cell from './Board.cell';
import styles from './Board.module.css';
import { BoardContainer } from '../Shared/Common';

const Board = ({
  playableBoard,
  direction,
  currentCells,
  focusedCell,
  dispatch,
  isPlaying,
  revealedCells,
  isPuzzleRevealed,
  isPuzzleSolved,
}) => {
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
        if (
          revealedCells.filter(
            coords =>
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

  const keyListener = event => {
    event.preventDefault();
    const { keyCode, key } = event;
    throttledKeyListener(keyCode, key);
  };

  // const rows = playableBoard.map((row, rowNum) => {
  //   return (
  //     <tr
  //       // it is fine to use index as key because the index will not change and is actually meaningful information because it's index = its position in the grid
  //       // eslint-disable-next-line react/no-array-index-key
  //       key={rowNum}
  //       style={{ width: '100%' }}
  //     >
  //       {row.map((cell, colNum) => {
  //         const black = cell.style === '#BS#';
  //         let isHighlighted = false;

  //         currentCells.some(coords => {
  //           // console.log('coords: ', coords);
  //           if (coords[0] === rowNum && coords[1] === colNum) {
  //             isHighlighted = true;
  //             return true;
  //           }
  //           return false;
  //         });

  //         const isRevealed =
  //           isPuzzleRevealed ||
  //           revealedCells.filter(
  //             cells => cells[0] === rowNum && cells[1] === colNum
  //           ).length > 0;
  //         return black ? (
  //           // eslint-disable-next-line react/no-array-index-key
  //           <td className={styles.black} key={`${rowNum}${colNum}`} />
  //         ) : (
  //           <Cell
  //             // eslint-disable-next-line react/no-array-index-key
  //             key={`${rowNum}${colNum}`}
  //             isHighlighted={isHighlighted}
  //             isFocused={focusedCell[0] === rowNum && focusedCell[1] === colNum}
  //             answer={isPlaying || isPuzzleSolved ? cell.answer : ''}
  //             isPlaying={isPlaying}
  //             guess={isPlaying ? cell.guess : ''}
  //             number={cell.number}
  //             style={cell.style}
  //             showAnswers={false}
  //             isRevealed={isRevealed}
  //             rowLength={playableBoard.length}
  //             coords={[rowNum, colNum]}
  //             click={() =>
  //               dispatch({ type: 'SELECT_CELL', cell: [rowNum, colNum] })
  //             }
  //           />
  //         );
  //       })}
  //     </tr>
  //   );
  // });
  return (
    <div>
      {/* <Clock play={playing} onClick={() => togglePlaying(!playing)} /> */}
      <div
        role="button"
        tabIndex="-1"
        // @ TODO NEXT // holding down key is causing freezing
        onKeyDown={keyListener}
      >
        <BoardContainer
          rows={playableBoard}
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

            const isRevealed =
              isPuzzleRevealed ||
              revealedCells.filter(
                cells => cells[0] === rowNum && cells[1] === colNum
              ).length > 0;
            return black ? (
              // eslint-disable-next-line react/no-array-index-key
              <td className={styles.black} key={`${rowNum}${colNum}`} />
            ) : (
              <Cell
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
                showAnswers={false}
                isRevealed={isRevealed}
                rowLength={playableBoard.length}
                coords={[rowNum, colNum]}
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

Board.propTypes = {
  playableBoard: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        answer: PropTypes.string.isRequired,
        guess: PropTypes.string,
        clues: PropTypes.arrayOf(PropTypes.string),
        number: PropTypes.number,
      })
    )
  ),
  direction: PropTypes.oneOf(['across', 'down']).isRequired,
  currentCells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  focusedCell: PropTypes.arrayOf(PropTypes.number).isRequired,
  // isConstructing: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  revealedCells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  isPuzzleRevealed: PropTypes.bool.isRequired,
  isPuzzleSolved: PropTypes.bool.isRequired,
};

Board.defaultProps = {
  currentCells: [],
  playableBoard: [[]],
  revealedCells: [],
  // isConstructing: false,
};
// position = [row, col]
// incOrDec = increment or decrement

export default Board;
