import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Cell from './Board.cell';
import styles from './Board.module.css';
// import Clock from "./Clock";
// import crossword from "./crossword.json";
// import _throttle from "lodash.throttle";
import {
  buildPlayableBoard,
  searchForBoundaryCell,
  searchForValidCell,
} from './Board.utils';
// const crossword = { board: ["A"] };
// Converts the object structure of board to store guesses next to answers

const Board = ({ initialBoard, currentClue, setClue, construct }) => {
  // const [wordCoords, setWordCoords] = useState([0, 0]);
  const [showAnswers, toggleAnswers] = useState(false);
  // const [playing, togglePlaying] = useState(true);

  const [board, updateBoard] = useState([]);
  useEffect(() => {
    // console.log(initialBoard);
    const playableBoard = buildPlayableBoard(initialBoard);
    // console.log('playable board: ', board);
    updateBoard(playableBoard);
  }, [initialBoard]);

  useEffect(() => {
    document.addEventListener('keydown', keyListener);
    document.addEventListener('keyup', keyListener.cancel);
    // setSelected(currentCoords[0], currentCoords[0])
    return () => {
      document.removeEventListener('keydown', keyListener);
      document.removeEventListener('keyup', keyListener.cancel);
    };
  }, [initialBoard]);

  // const [rebusPosition, setRebus] = useState(null);
  const [currentCoords, setCurrentCoords] = useState([0, 0]);
  const [direction, setDirection] = useState('across');

  // Get coords and direction from currentClue
  useEffect(() => {
    const newPosition = currentClue.substring(0, currentClue.length - 1);
    const newDirection =
      currentClue.substring(currentClue.length - 1, currentClue.length) === 'A'
        ? 'across'
        : 'down';
    board.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell.number) {
          if (cell.number.toString() === newPosition) {
            setCurrentCoords([r, c]);
            setDirection(newDirection);
          }
        }
      });
    });
  }, [currentClue]);

  const keyListener = event => {
    let newDirection = direction;
    let { code } = event;
    const [row, col] = currentCoords;
    const newBoard = { ...board };
    if (code === 'Insert') {
      // return setRebus(true);
      // Check for change of direction
    } else if (/^[a-z0-9._]+$/i.test(event.key) && event.key.length === 1) {
      // INSERT GUESS
      newBoard[row][col].guess = event.key;
      updateBoard(newBoard);
      // After inserting a letter move to the next position by making this key listener think the arrow key was pressed
      if (direction === 'down') code = 'ArrowDown';
      else code = 'ArrowRight'; // @TODO DOn't move if we've reached a black square or the end of the board also we need to skip letters if they're already therr
    } else if (code === 'Backspace') {
      if (/^[a-z0-9._]+$/i.test(initialBoard[row][col].guess)) {
        newBoard[row][col].guess = '';
        updateBoard(newBoard);
      }
      if (construct && newBoard[row][col].answer === '#BlackSquare#') {
        newBoard[row][col].answer = ' ';
        newBoard[7 + (7 - row)][7 + (7 - col)].answer = ' ';
      }
      if (direction === 'down') code = 'ArrowUp';
      else code = 'ArrowLeft';
    } else if (code === 'Space') {
      if (construct) {
        newBoard[row][col].answer = '#BlackSquare#';
        newBoard[7 + (7 - row)][7 + (7 - col)].answer = '#BlackSquare#';
      }
      if (direction === 'down') code = 'ArrowDown';
      else code = 'ArrowRight';
    }
    if (
      (code === 'ArrowRight' || code === 'ArrowLeft') &&
      direction === 'down'
    ) {
      newDirection = 'across';
    } else if (
      (code === 'ArrowDown' || code === 'ArrowUp') &&
      direction === 'across'
    ) {
      newDirection = 'down';
    } else if (
      code === 'ArrowRight' ||
      code === 'ArrowLeft' ||
      code === 'ArrowDown' ||
      code === 'ArrowUp'
    ) {
      const nextCell = searchForValidCell(
        row,
        col,
        direction,
        code,
        initialBoard
        // @TODO settings
      );
      // @TODO setClue
      setCurrentCoords(nextCell);
      return;
    }
    if (newDirection !== direction) {
      setDirection(newDirection);
      return;
    }
    setCurrentCoords([row, col]);
    // setWordCoords([wordBeg, wordEnd]);

    // console.log('should not see this')
    // updatePosition(increment, decrement)
  };

  const [wordCoords, setWordBoundaries] = useState([0, 0]);
  useEffect(() => {
    const [row, col] = currentCoords;
    const newDirection = direction;
    const wordEnd = searchForBoundaryCell(
      row,
      col,
      newDirection,
      'INCREMENT',
      initialBoard
    );
    const wordBeg = searchForBoundaryCell(
      row,
      col,
      newDirection,
      'DECREMENT',
      initialBoard
    );
    let clue;
    if (board[row] && newDirection === 'across') {
      clue = `${board[row][wordBeg].number}A`;
      // console.log('new clue: ', clue);
      if (clue !== currentClue) {
        setClue(clue);
      }
    }
    setWordBoundaries([wordBeg, wordEnd]);
  }, [currentCoords, direction, currentClue]);

  // const setSelected = (row, col, newDirection) => {
  //   console.log('current clue: ', currentClue);
  //   // Toggle direction if clicking active sqaure
  // };

  const clickListener = (rowNum, colNum) => {
    let newDirection = direction;
    if (rowNum === currentCoords[0] && colNum === currentCoords[1]) {
      // toggle direction
      newDirection = direction === 'across' ? 'down' : 'across';
      setDirection(newDirection);
      return;
    }
    setCurrentCoords([rowNum, colNum]);
    // setWordCoords([wordBeg, wordEnd]);
  };

  // let wordCoords = setSelected(currentCoords[0], currentCoords[1], direction);
  const rows = Object.keys(board).map((row, rowNum) => {
    return (
      <tr className={styles.board} key={row}>
        {board[row].map((cell, colNum) => {
          const black = cell.answer === '#BlackSquare#';
          let highlighted = false;
          if (direction === 'across') {
            if (
              colNum >= wordCoords[0] &&
              colNum <= wordCoords[1] &&
              rowNum === currentCoords[0]
            ) {
              highlighted = true;
            }
          } else if (
            rowNum >= wordCoords[0] &&
            rowNum <= wordCoords[1] &&
            colNum === currentCoords[1]
          ) {
            highlighted = true;
          }
          return black ? (
            <td className={styles.black} />
          ) : (
            <Cell
              highlighted={highlighted}
              focus={currentCoords[0] === rowNum && currentCoords[1] === colNum}
              answer={cell.answer}
              guess={cell.guess}
              number={cell.number}
              showAnswer={showAnswers}
              coords={[rowNum, colNum]}
              click={() => clickListener(rowNum, colNum)}
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
        <tbody className="board">{rows}</tbody>
      </table>
      {/* <div className="clues">
        <div className="acrossClues">
          {crossword.clues
            .filter(clue => clue.position.indexOf("A") > -1)
            .map(clue => {
              return <div className="clue">{clue.position}</div>;
            })}
        </div>
        <div className="downClues">
          {crossword.clues
            .filter(clue => clue.position.indexOf("D") > -1)
            .map(clue => {
              return <div className="clue">{clue.position}</div>;
            })}
        </div>
      </div> */}
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
  initialBoard: PropTypes.shape({}).isRequired,
  currentClue: PropTypes.string.isRequired,
  setClue: PropTypes.func.isRequired,
  construct: PropTypes.func.isRequired,
};
// position = [row, col]
// incOrDec = increment or decrement

export default Board;
