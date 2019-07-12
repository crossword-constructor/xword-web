import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
import { Query } from 'react-apollo';
import Month from './Month';
import styles from './Calendar.module.css';
// import YearList from './YearList';
import Dropdown from './Dropdown';
import { FETCH_PUZZLES } from '../utils/queries';
import { monthMap, numberMonth, buildYearsArr } from './utils';

const Calendar = () => {
  // console.log('current date', moment(Date.now()).format('M/D/YYYY'));
  const date = new Date();

  let month = date.getUTCMonth() + 1;
  month = month.toString();
  const year = date.getUTCFullYear().toString();
  const [currentMonth, setMonth] = useState(month);
  const [currentYear, setYear] = useState(year);
  return (
    <div className={styles.container}>
      <div />
      <div className={styles.datePicker}>
        <div className={styles.menu}>
          {/* dropdown1 */}
          <Dropdown
            list={Object.keys(monthMap).map(m => monthMap[m])}
            select={item => setMonth(numberMonth[item])}
            title={monthMap[currentMonth]}
          />
        </div>
        <div className={styles.menu}>
          <Dropdown
            list={buildYearsArr()}
            select={setYear}
            title={currentYear}
          />
        </div>
      </div>
      {/* <YearList setDate={setDate} /> */}
      <Query
        query={FETCH_PUZZLES}
        variables={{ month: currentMonth, year: currentYear }}
      >
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
          }
          if (loading)
            return (
              <div className={styles.calendarContainer}>
                {/* <h2 className={styles.currentMonth}>
                  {monthMap[currentMonth]} {currentYear}
                </h2> */}
                {/* <Month puzzles={null} month={currentMonth} year={currentYear} /> */}
              </div>
            );
          if (data) {
            const {
              puzzles: { success, message, puzzles },
            } = data;
            if (!success && message) {
              return message;
            }

            if (puzzles) {
              return (
                <div className={styles.calendarContainer}>
                  {/* <h2 className={styles.currentMonth}>
                    {monthMap[currentMonth]} {currentYear}
                  </h2> */}
                  <Month
                    puzzles={puzzles}
                    month={currentMonth}
                    year={currentYear}
                  />
                </div>
              );
            }
          }
          return <div>Loading</div>;
        }}
      </Query>
    </div>
  );
};

export default Calendar;
