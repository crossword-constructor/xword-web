import React from 'react';
import styled from '@emotion/styled';

export const Page = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: ${({ theme }) => theme.sizes.s6}rem;
  /* max-width: 1500px; */
  z-index: 1;
`;

const BoardOuter = styled.table`
  width: 100%;
`;

const BoardInner = styled.tbody`
  font-size: 1.8vw;
  border: 2px solid #333;
  width: 100%;
  margin-bottom: 40px;
`;

const TableRow = styled.tr`
  width: 100%;
`;

export const BoardContainer = ({ rows, cellRenderer }) => {
  return (
    <BoardOuter>
      <BoardInner>
        {rows.map((row, rowCount) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={rowCount}>
              {row.map((cell, colCount) =>
                cellRenderer(cell, rowCount, colCount)
              )}
            </TableRow>
          );
        })}
      </BoardInner>
    </BoardOuter>
  );
};
