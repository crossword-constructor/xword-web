import styled from '@emotion/styled';
import { ReactElement } from 'react';
import { PlayableCell } from '../Utils/board';
interface BoardContainerProps {
  rows: Array<Array<PlayableCell>>;
  cellRenderer: (
    cell: PlayableCell,
    rowCount: number,
    colCount: number
  ) => ReactElement;
}

export const BoardContainer = ({ rows, cellRenderer }: BoardContainerProps) => {
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

const BoardOuter = styled.table`
  width: 100%;
  border-spacing: 0px;
  /* border-collapse:; */
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
