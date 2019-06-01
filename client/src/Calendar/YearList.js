import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { buildYearList } from './utils';
import styles from './YearList.module.css';

const YearList = ({ setDate }) => {
  const [currentYear, setYear] = useState('2019');
  const yearList = buildYearList();
  return (
    <ul className={styles.yearList}>
      {yearList.reverse().map(year => (
        <li key={year.date}>
          <div
            className={styles.year}
            onClick={() => setYear(year.date)}
            role="button"
            tabIndex="-1"
            onKeyPress={() => setYear(year.date)}
          >
            {year.date}
          </div>
          <ul
            className={
              currentYear === year.date ? styles.expanded : styles.collapsed
            }
          >
            {year.months.map(month => (
              <li key={month.date}>
                <div
                  onClick={() =>
                    setDate([month.date.toString(), year.date.toString()])
                  }
                  onKeyPress={() =>
                    setDate([month.date.toString(), year.date.toString()])
                  }
                  role="button"
                  tabIndex="-1"
                  style={{ marginLeft: 5 }}
                >
                  {month.title}
                </div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

YearList.propTypes = {
  setDate: PropTypes.func.isRequired,
};

export default YearList;
