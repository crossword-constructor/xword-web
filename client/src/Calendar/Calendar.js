import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Month from './Month';
import styles from './Calendar.module.css';
// import YearList from './YearList';
import Dropdown from './Dropdown';
import { FETCH_PUZZLES } from '../Utils/queries';
import { monthMap, numberMonth, buildYearsArr } from './utils';

const Calendar = () => {
  console.log('loading calendar');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  // console.log('current date', moment(Date.now()).format('M/D/YYYY'));

  // const [currentMonth, setMonth] = useState(month);
  // const [currentYear, setYear] = useState(year);
  const { data, refetch } = useQuery(FETCH_PUZZLES, {
    variables: {
      month,
      year,
    },
  });
  const updateDate = (newMonth, newYear) => {
    console.log('navigating');
    navigate({
      pathname: '/calendar',
      search: `?${createSearchParams({
        month: newMonth,
        year: newYear,
      })}`,
    });
    // refetch({ month: newMonth, year: newYear });
    // setMonth(newMonth);
    // setYear(newYear);
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
            select={item => updateDate(numberMonth[item], year)}
            title={monthMap[month]}
          />
        </div>
        <div className={styles.menu}>
          <Dropdown
            list={buildYearsArr()}
            select={newYear => updateDate(month, newYear)}
            title={year}
          />
        </div>
      </div>
      <div className={styles.calendarContainer}>
        {data && data.puzzles && (
          <Month puzzles={data.puzzles.puzzles} month={month} year={year} />
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
