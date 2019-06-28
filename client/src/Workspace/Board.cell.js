import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Board.module.css';

const Cell = ({
  answer,
  number,
  guess,
  isShowingAnswer,
  click,
  isFocused,
  isHighlighted,
}) => {
  const cell = useRef(null);

  useEffect(() => {
    if (cell.current) {
      cell.current.focus();
    }
  }, []);
  const highlightBlue = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--highlightBlue');
  let background = '#F6F6F6';
  if (isFocused) {
    background = 'yellow';
  } else if (isHighlighted) {
    background = highlightBlue;
  }
  let color = 'black';
  if (isShowingAnswer) {
    if (answer.toLowerCase() !== guess.toLowerCase()) {
      color = 'red';
    }
  }
  return (
    <td className={styles.cell}>
      <div className={styles.number}>{number}</div>
      <div
        ref={cell}
        style={{
          background,
          color,
        }}
        className={styles.cellInput}
        onMouseDown={click}
        role="button"
        tabIndex="-1"
      >
        {isShowingAnswer ? answer : guess}
      </div>
    </td>
  );
};

Cell.propTypes = {
  answer: PropTypes.string.isRequired,
  guess: PropTypes.string,
  number: PropTypes.number,
  click: PropTypes.func.isRequired,
  isShowingAnswer: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  // coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  isFocused: PropTypes.bool,
};

Cell.defaultProps = {
  guess: '',
  number: null,
  isShowingAnswer: false,
  isFocused: false,
  isHighlighted: false,
};

export default Cell;
