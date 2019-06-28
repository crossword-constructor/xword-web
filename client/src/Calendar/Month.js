import React from 'react';
import PropTypes from 'prop-types';
import { buildMonth } from './utils';
import styles from './Month.module.css';
import PuzzleIcon from '../Shared/PuzzleIcon';

const Month = ({ puzzles, month, year }) => {
  // return <div>{puzzles.map(puzzle => puzzle.title)}</div>;
  // FOr the first few years of the NYT crossword puzzle the puzzle was only published on sunday.
  // For these months we need to construct the days of the month and then figure out which puzzle goes where
  // in the array of dates
  //
  // For puzzles after 1952 we have a puzzle for every day of the week until the present day without exception
  // so for those years (which is most) we can just iterate over the list of puzzles
  const days = buildMonth(month, year);
  let puzzleDates;
  if (puzzles) {
    puzzleDates = puzzles.map(puzzle => puzzle.date);
  } else {
    puzzleDates = new Array(31);
  }

  return (
    <ul className={styles.month}>
      {days.map(day => {
        if (puzzleDates.indexOf(day.date) > -1) {
          const index = puzzleDates.indexOf(day.date);
          return (
            <div className={styles.day} key={day.date}>
              {/* <div className={styles.playRibbon}>Play</div> */}
              <div className={styles.number}>{day.number}</div>

              <PuzzleIcon size={80} id={puzzles[index]._id} />
              {/* <span className={styles.title}>
                    {puzzles[index].title.toLowerCase()}
                  </span>
                  <div>{puzzles[index].author}</div> */}
            </div>
          );
        }
        if (day === 'BLANK') {
          return <div className={styles.day} key={day.date} />;
        }
        return (
          <div
            className={day.number ? styles.day : styles.dayHeading}
            key={day.date}
          >
            {day.number || day}
          </div>
        );
      })}
    </ul>
  );
};

Month.propTypes = {
  puzzles: PropTypes.arrayOf(PropTypes.shape({})),
  month: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

Month.defaultProps = {
  puzzles: null,
};
export default Month;
