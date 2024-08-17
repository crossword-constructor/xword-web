import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
import { useQuery } from '@apollo/client';
import { Query } from 'react-apollo';
import Month from './Month';
import styles from './Calendar.module.css';
// import YearList from './YearList';
import Dropdown from './Dropdown';
import { FETCH_PUZZLES } from '../Utils/queries';
import { monthMap, numberMonth, buildYearsArr } from './utils';

const Calendar = () => {
  console.log('loading calendar');
  // console.log('current date', moment(Date.now()).format('M/D/YYYY'));
  const date = new Date();

  let month = date.getUTCMonth() + 1;
  month = month.toString();
  const year = date.getUTCFullYear().toString();
  const [currentMonth, setMonth] = useState(month);
  const [currentYear, setYear] = useState(year);
  const { data, refetch } = useQuery(FETCH_PUZZLES, {
    variables: {
      month: currentMonth,
      year: currentYear,
    },
  });
  const updateDate = (newMonth, newYear) => {
    refetch({ month: newMonth, year: newYear });
    setMonth(newMonth);
    setYear(newYear);
  };
  if (data) {
    console.log(data.puzzles);
  }
  return (
    <div className={styles.container}>
      <div />
      <div className={styles.datePicker}>
        <div className={styles.menu}>
          {/* dropdown1 */}
          <Dropdown
            list={Object.keys(monthMap).map(m => monthMap[m])}
            select={item => updateDate(numberMonth[item], currentYear)}
            title={monthMap[currentMonth]}
          />
        </div>
        <div className={styles.menu}>
          <Dropdown
            list={buildYearsArr()}
            select={newYear => updateDate(currentMonth, newYear)}
            title={currentYear}
          />
        </div>
      </div>
      <div className={styles.calendarContainer}>
        {data && data.puzzles && (
          <Month
            puzzles={data.puzzles.puzzles}
            month={currentMonth}
            year={currentYear}
          />
        )}
      </div>

      {/* <YearList setDate={setDate} /> */}
      {/* <Query
        query={FETCH_PUZZLES}
        variables={{ month: currentMonth, year: currentYear }}
      >
        {({ loading, error, data }) => {
          if (error) {
            console.log(error);
          }
          if (loading) return <div className={styles.calendarContainer} />;
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
      </Query> */}
    </div>
  );
};

export default Calendar;
