import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Board.module.css';

const Cell = ({
  answer,
  number,
  guess,
  isRevealed,
  click,
  isFocused,
  isHighlighted,
  isPlaying,
  rowLength,
}) => {
  const cell = useRef(null);

  useEffect(() => {
    if (cell.current && isFocused && isPlaying) {
      cell.current.focus();
    }
  }, [isFocused, isPlaying]);

  /** @consider doing this with a className so we keep the stling to css */
  const highlightBlue = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--highlightBlue');
  let background = '#F6F6F6';
  if (isFocused) {
    background = 'rgb(255, 200, 100)';
  } else if (isHighlighted) {
    background = highlightBlue;
  }
  let color = 'black';
  if (isRevealed) {
    if (answer.toLowerCase() !== guess.toLowerCase()) {
      color = 'red';
    }
  }
  return (
    <td
      className={styles.cell}
      style={{
        width: `${100 / rowLength}%`,
        height: 0,
        paddingBottom: `${100 / rowLength}%`,
        maxHeight: '34px',
        maxWidth: '34px',
      }}
    >
      <div className={styles.number}>{number}</div>
      <div
        ref={cell}
        style={{
          background,
          color,
          width: '100%',
        }}
        className={styles.cellInput}
        onMouseDown={click}
        role="button"
        tabIndex="-1"
      >
        {isRevealed ? answer : guess}
      </div>
    </td>
  );
};

Cell.propTypes = {
  answer: PropTypes.string.isRequired,
  guess: PropTypes.string,
  number: PropTypes.number,
  click: PropTypes.func.isRequired,
  isRevealed: PropTypes.bool,
  isHighlighted: PropTypes.bool,
  isPlaying: PropTypes.bool.isRequired,
  rowLength: PropTypes.number.isRequired,
  // coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  isFocused: PropTypes.bool,
};

Cell.defaultProps = {
  guess: '',
  number: null,
  isRevealed: false,
  isFocused: false,
  isHighlighted: false,
};

export default Cell;
