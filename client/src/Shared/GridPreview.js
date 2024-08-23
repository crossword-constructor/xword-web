/* eslint-disable react/no-array-index-key */
import React from 'react';
import { BaseCell } from '../Workspace/Board.cell';
import styles from '../Workspace/Board.module.css';
import { BoardContainer } from './Common';

const GridPreview = ({ size }) => {
  console.log({ size });
  const rows = new Array(size).fill('_');
  const cols = new Array(size).fill('_');
  console.log({ rows, cols });
  const rowEls = rows.map((row, i) => {
    return (
      <tr key={i} style={{ border: '1px solid red', width: '100%' }}>
        {cols.map((col, j) => {
          return <BaseCell key={j} $width={(size - 1) / 100} />;
        })}
      </tr>
    );
  });
  return <BoardContainer>{rowEls}</BoardContainer>;
};

export default GridPreview;
