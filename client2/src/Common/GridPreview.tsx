import styled from '@emotion/styled';
export interface Cell {
  text: string;
  style: string;
}
export const GridPreview = ({
  board,
  width,
}: {
  board: Array<Cell>;
  width: number;
}) => {
  return (
    <Grid $width={width}>
      {board.map((cell) => (
        <div
          style={{
            background: cell.style === '#BS#' ? 'black' : '#fff280',
          }}
        />
      ))}
    </Grid>
  );
};

interface GridProps {
  $width: number;
}
const Grid = styled.div<GridProps>`
  display: grid;
  border: 1px solid black;
  width: ${({ $width }) => ($width > 15 ? 85 : 70)}px;
  height: ${({ $width }) => ($width > 15 ? 85 : 70)}px;
  grid-template-columns: repeat(${({ $width }) => $width}, 1fr);
  grid-template-rows: repeat(${({ $width }) => $width}, 1fr);
  column-gap: 0px;
  row-gap: 0px;
`;
