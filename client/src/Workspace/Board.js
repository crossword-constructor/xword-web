import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import Cell from './Board.cell';
import styles from './Board.module.css';

const Board = ({
  playableBoard,
  direction,
  currentCells,
  focusedCell,
  selectCell,
  navigate,
  guess,
  isPlaying,
  revealedCells,
}) => {
  const throttledKeyListener = useCallback(
    throttle((keyCode, key) => {
      if (keyCode >= 37 && keyCode <= 40) {
        navigate(keyCode);
        // @todo add conditional for rebus
      } else if (keyCode >= 45 && keyCode <= 90) {
        guess(key);
      } else if (keyCode === 8) {
        navigate(direction === 'across' ? 37 : 38, { clearFirst: true });
      }
    }, 50),
    [direction]
  );

  const keyListener = event => {
    const { keyCode, key } = event;
    throttledKeyListener(keyCode, key);
  };
  const rows = playableBoard.map((row, rowNum) => {
    return (
      // it is fine to use index as key because the index will not change and is actually meaningful information because it's index = its position in the grid
      <tr
        // eslint-disable-next-line react/no-array-index-key
        key={rowNum}
        // className={styles.board}
      >
        {row.map((cell, colNum) => {
          const black = cell.answer === '#BlackSquare#';
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
            revealedCells === 'ALL' ||
            revealedCells.indexOf([rowNum, colNum]) > -1;
          return black ? (
            // eslint-disable-next-line react/no-array-index-key
            <td className={styles.black} key={`${rowNum}${colNum}`} />
          ) : (
            <Cell
              // eslint-disable-next-line react/no-array-index-key
              key={`${rowNum}${colNum}`}
              isHighlighted={isHighlighted}
              isFocused={focusedCell[0] === rowNum && focusedCell[1] === colNum}
              answer={cell.answer}
              guess={isPlaying ? cell.guess : ''}
              number={cell.number}
              showAnswers={false}
              isRevealed={isRevealed}
              coords={[rowNum, colNum]}
              click={() => selectCell([rowNum, colNum])}
            />
          );
        })}
      </tr>
    );
  });
  return (
    <div className="page">
      {/* <Clock play={playing} onClick={() => togglePlaying(!playing)} /> */}
      <div
        role="button"
        tabIndex="-1"
        // @ TODO NEXT // holding down key is causing freezing
        onKeyDown={keyListener}
      >
        <table>
          <tbody className={styles.board}>{rows}</tbody>
        </table>
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
  selectCell: PropTypes.func.isRequired,
  focusedCell: PropTypes.arrayOf(PropTypes.number).isRequired,
  // isConstructing: PropTypes.bool,
  navigate: PropTypes.func.isRequired,
  guess: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  revealedCells: PropTypes.oneOf([
    PropTypes.oneOf(['All']),
    PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  ]),
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
