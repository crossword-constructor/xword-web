import React, { useState } from "react";
import { buildYearList } from "./utils";
import styles from "./Calendar.module.css";
export default props => {
  let [currentYear, setYear] = useState("2019");
  let yearList = buildYearList();
  return (
    <ul className={styles.yearList}>
      {yearList.reverse().map(year => (
        <li key={year.date}>
          <div className={styles.year} onClick={() => setYear(year.date)}>
            {year.date}
          </div>
          <ul
            className={
              currentYear === year.date ? styles.expanded : styles.collapsed
            }
          >
            {year.months.map(month => (
              <li
                key={month.date}
                onClick={() =>
                  props.setDate([month.date.toString(), year.date.toString()])
                }
              >
                <div style={{ marginLeft: 5 }}>{month.title}</div>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
