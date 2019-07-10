/* eslint-disable no-unused-vars */
import React from 'react';
// import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import moment from 'moment';
import { TODAYS_PUZZLE } from '../utils/queries';
import PuzzleIcon from '../Shared/PuzzleIcon';
import styles from './PuzzleOfTheDay.module.css';

const PuzzleOfTheDay = () => {
  // get todays date
  // fetchPuzzle
  // display
  const date = getDateString();

  return (
    <div className={styles.container}>
      <Query query={TODAYS_PUZZLE} variables={{ date }}>
        {({ data, error, loading }) => {
          if (data && data.todaysPuzzle) {
            const {
              todaysPuzzle: { success, message, puzzle },
            } = data;
            if (success) {
              return (
                <PuzzleIcon
                  {...puzzle}
                  date={moment(puzzle.date).format('dddd, MMMM Do, YYYY')}
                />
              );
            }
            return 'error';
          }
          return 'loading';
        }}
      </Query>
    </div>
  );
};

const getDateString = () => {
  const today = new Date();
  const dd = String(today.getDate());
  const mm = String(today.getMonth() + 1); // January is 0!
  const yyyy = today.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

export default PuzzleOfTheDay;
