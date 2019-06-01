import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Month from './Month';
import styles from './Calendar.module.css';
import YearList from './YearList';
import { monthMap } from './utils';

const FETCH_PUZZLES = gql`
  query Puzzles($month: String, $year: String) {
    puzzles(month: $month, year: $year) {
      id
      # author
      # title
      date
    }
  }
`;

const Calendar = () => {
  // console.log('current date', moment(Date.now()).format('M/D/YYYY'));
  const date = new Date();

  let month = date.getUTCMonth() + 1;
  month = month.toString();
  const year = date.getUTCFullYear().toString();
  // console.log(month, year);
  const [[currentMonth, currentYear], setDate] = useState([month, year]);

  // console.log(currentMonth, currentYear);
  return (
    <div className={styles.container}>
      <YearList setDate={setDate} />
      <Query
        query={FETCH_PUZZLES}
        variables={{ month: currentMonth, year: currentYear }}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div className={styles.calendarContainer}>
                <h2 className={styles.currentMonth}>
                  {monthMap[currentMonth]} {currentYear}
                </h2>
                <Month puzzles={null} month={currentMonth} year={currentYear} />
              </div>
            );
          if (error) {
            // console.log('ERROR: ', JSON.stringify(error, null, 2));
            return 'error';
          }
          // console.log(data);
          return (
            <div className={styles.calendarContainer}>
              <h2 className={styles.currentMonth}>
                {monthMap[currentMonth]} {currentYear}
              </h2>
              <Month
                puzzles={data.puzzles}
                month={currentMonth}
                year={currentYear}
              />
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default Calendar;
