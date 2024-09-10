import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

interface CellProps {
  text: string;
  number: string;
  isRevealed: boolean;
  click: () => void;
  isFocused: boolean;
  isHighlighted: boolean;
  isPlaying: boolean;
  rowLength: number;
  style: string;
}
export const CellComp = ({
  text,
  number,
  isRevealed = false,
  click,
  isFocused,
  isHighlighted,
  isPlaying,
  rowLength,
  style,
}: CellProps) => {
  const cell = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cell.current && isFocused && isPlaying) {
      setTimeout(() => cell?.current?.focus?.(), 0);
    }
  }, [isFocused, isPlaying]);

  /** @consider doing this with a className so we keep the stling to css */
  const highlightBlue = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--highlightBlue');
  let background = '#F6F6F6';
  if (style === '#BS#') {
    background = 'black';
  } else if (isFocused) {
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
    >
      <Number style={{ fontSize: '0.9cqw' }}>{number}</Number>
      <CellContainer
        ref={cell}
        style={{
          background,
          color,
          fontSize: `${fontSize}cqw`,
          width: '100%',
        }}
        // className={styles.cellInput}
        onMouseDown={click}
        role="button"
        tabIndex={-1}
      >
        {style === 'circle' && <Circle />}
        <Text>{text}</Text>
      </CellContainer>
    </BaseCell>
  );
};

export const ContructableCell = () => {};

interface BaseCellProps {
  $width: number;
}

export const BaseCell = styled.td<BaseCellProps>`
  width: ${({ $width }) => $width}%;
  /* height: ${({ $width }) => $width}%; */
  padding-bottom: ${({ $width }) => $width}%;
  /* max-height: 34px;
  max-width: 34px; */
  box-sizing: border-box;
  position: relative;
  border: 0.001rem solid black;
  cursor: default;
  div:focus {
    border: 2px solid red;
  }
  div:focus-visible {
    outline: none;
  }
`;

const CellContainer = styled.div`
  // Cell Input styles
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* max-height: 34px;
  max-width: 34px; */
  background: rgb(139, 190, 255);
  text-transform: capitalize;
  display: flex;
  cursor: default;
  align-items: flex-end;
  justify-content: center;
`;

const CellInput = styled.div``;

const Number = styled.div`
  position: absolute;
  font-size: 0.8vw;
  z-index: 1;
  top: 1px;
  left: 1px;
`;

const Text = styled.div`
  z-index: 2;
`;

const Circle = styled.div`
  margin: 2.5%;
  margin-bottom: 0;
  height: 80%;
  width: 85%;
  background: #f7e69f;
  border: 2.5px solid #ffd83e;
  border-radius: 45%;
  z-index: 0;
  position: absolute;
`;
