import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import styles from './Board.module.css';

const Cell = ({
  text,
  number,
  isRevealed,
  click,
  isFocused,
  isHighlighted,
  isPlaying,
  rowLength,
  style,
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
  const color = 'black';
  // if (isRevealed) {
  //   if (answer.toLowerCase() !== guess.toLowerCase()) {
  //     color = 'red';
  //   }
  // }
  let fontSize = 1.1;
  if (cell.current) {
    if (text && text.length > 1) {
      fontSize = 1.1 - 0.13 * text.length;
    }
  }
  return (
    <BaseCell
      // className={styles.cell}
      $width={100 / rowLength}
      // style={{
      //   width: `%`,
      //   height: 0,
      //   paddingBottom: `${100 / rowLength}%`,
      //   maxHeight: '34px',
      //   maxWidth: '34px',
      // }}
    >
      <div className={styles.number} style={{ fontSize: '0.9cqw' }}>
        {number}
      </div>
      <div
        ref={cell}
        style={{
          background,
          color,
          fontSize: `${fontSize}cqw`,
          width: '100%',
        }}
        className={styles.cellInput}
        onMouseDown={click}
        role="button"
        tabIndex="-1"
      >
        {style === 'circle' && <div className={styles.circle} />}
        <div className={styles.text}>{text}</div>
      </div>
    </BaseCell>
  );
};

export const BaseCell = styled.td`
  width: ${({ $width }) => $width}%;
  /* height: ${({ $width }) => $width}%; */
  padding-bottom: ${({ $width }) => $width}%;
  /* max-height: 34px;
  max-width: 34px; */
  position: relative;
  border: 1px solid black;
  cursor: default;
`;

Cell.propTypes = {
  text: PropTypes.string.isRequired,
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
  number: null,
  isRevealed: false,
  isFocused: false,
  isHighlighted: false,
};

export default Cell;
