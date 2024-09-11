import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { buildMonth, dayMap } from '../Utils/calendar';
import styled from '@emotion/styled';
import moment from 'moment';
import { PuzzleIcon } from '../Common/PuzzleIcon';
import { GridPreview } from '../Common/GridPreview';
// import PuzzleIcon from '../Shared/PuzzleIcon';

interface MonthProps {
  puzzles: Record<string, any>[];
  month: number;
  year: number;
}
export const Month = ({ puzzles, month, year }: MonthProps) => {
  const navigate = useNavigate();
  // return <div>{puzzles.map(puzzle => puzzle.title)}</div>;
  // FOr the first few years of the NYT crossword puzzle the puzzle was only published on sunday.
  // For these months we need to construct the days of the month and then figure out which puzzle goes where
  // in the array of dates
  //
  // For puzzles after 1952 we have a puzzle for every day of the week until the present day without exception
  // so for those years (which is most) we can just iterate over the list of puzzles
  const days = buildMonth(month, year);
  const puzzleDates = puzzles.map((puzzle) =>
    moment.unix(puzzle.date / 1000).format('M/D/YYYY')
  );
  return (
    <MonthContainer>
      <MonthGrid>
        {Object.values(dayMap).map((value) => (
          <Heading>{value}</Heading>
        ))}
        {days.map((day, i) => {
          const puzzleIndex = puzzleDates.indexOf(day.date);
          const puzzle = puzzles[puzzleIndex];
          if (i === 0) {
            return (
              <FirstDay
                key={day.date}
                $start={moment(`${year}/${month}/${i + 1}`).weekday() + 1}
                onClick={() => navigate(`/solve/${puzzle.id}`)}
              >
                <Number>{day.number}</Number>
                {puzzleIndex > -1 && <PuzzleIcon size={80} id={puzzle.id} />}
              </FirstDay>
            );
          }
          return (
            <Day key={day.date} onClick={() => navigate(`/solve/${puzzle.id}`)}>
              <Number>{day.number}</Number>
              {puzzleIndex > -1 && (
                <GridPreview
                  board={puzzle?.board ?? []}
                  width={puzzle?.width}
                />
              )}
            </Day>
          );
        })}
      </MonthGrid>
    </MonthContainer>
  );
};

Month.propTypes = {
  puzzles: PropTypes.arrayOf(PropTypes.shape({})),
  month: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

Month.defaultProps = {
  puzzles: [],
};

const MonthContainer = styled.div`
  height: 90%;
  width: 90%;
`;

const Day = styled.button`
  border: 1px solid #ddd;
  list-style-type: none;
  background-color: #fafafa;
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
`;

const Number = styled.div`
  position: absolute;
  top: 4px;
`;

const Heading = styled(Day)`
  text-align: center;
`;

const MonthGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: auto 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 6px;
  grid-row-gap: 6px;
`;
const FirstDay = styled(Day)`
  grid-column-start: ${(props: { $start: number }) => props.$start};
`;
