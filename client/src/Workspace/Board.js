import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import Cell from './Board.cell';
import styles from './Board.module.css';
// import Clock from "./Clock";
// import crossword from "./crossword.json";
// import _throttle from "lodash.throttle";
// import // buildPlayableBoard,
// searchForBoundaryCell,
// searchForValidCell,
// './Board.utils';
// const crossword = { board: ["A"] };
// Converts the object structure of board to store guesses next to answers

// eslint-disable-next-line no-unused-vars
const Board = ({
  playableBoard,
  direction,
  currentCells,
  focusedCell,
  selectCell,
  navigate,
  guess,

  isConstructing,
}) => {
  // const currentCoords = [0, 0];
  const showAnswers = () => {};
  const toggleAnswers = () => {};

  const throttledKeyListener = useCallback(
    throttle((keyCode, key) => {
      if (keyCode >= 37 && keyCode <= 40) {
        navigate(keyCode);
        // @todo add conditional for rebus
      } else {
        guess(key);
      }
    }, 50),
    []
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
        className={styles.board}
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
          // if (rowNum === 0 && colNum > 3 && colNum < 9) {
          // console.log('highlighted after ', highlighted);
          // }
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
              guess={cell.guess}
              number={cell.number}
              showAnswer={showAnswers}
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
      <table>
        <tbody className="board">
          <div
            role="button"
            tabIndex="-1"
            // @ TODO NEXT // holding down key is causing freezing
            onKeyDown={keyListener}
          >
            {rows}
          </div>
        </tbody>
      </table>
      <div>{isConstructing}</div>
      <div>{direction}</div>
      <button
        onClick={() => toggleAnswers(!showAnswers)}
        className={styles.reveal}
        type="button"
      >
        {showAnswers ? 'Hide Answers' : 'Reveal Answers'}
      </button>
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
  isConstructing: PropTypes.bool,
  navigate: PropTypes.func.isRequired,
  guess: PropTypes.func.isRequired,
};

Board.defaultProps = {
  currentCells: [],
  playableBoard: [[]],
  isConstructing: false,
};
// position = [row, col]
// incOrDec = increment or decrement

export default Board;
