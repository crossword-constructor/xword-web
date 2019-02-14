import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Month from "./Month";
import styles from "./Calendar.module.css";
import { BuildYearList, monthMap } from "./utils";

const Calendar = () => {
  const [[currentMonth, currentYear], setDate] = useState(["2", "1942"]);

  const FETCH_PUZZLES = gql`
    query Puzzles($month: String, $year: String) {
      puzzles(month: $month, year: $year) {
        id
        author
        title
        date
      }
    }
  `;

  let yearList = BuildYearList();
  console.log(currentMonth, currentYear);
  return (
    <div className={styles.page}>
      <ul>
        {yearList.reverse().map(year => (
          <li key={year.date}>
            <div style={{ fontWeight: 600 }}>{year.date}</div>
            <ul>
              {year.months.map(month => (
                <li
                  key={month.date}
                  onClick={() =>
                    setDate([month.date.toString(), year.date.toString()])
                  }
                >
                  <div style={{ marginLeft: 5 }}>{month.title}</div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Query
        query={FETCH_PUZZLES}
        variables={{ month: currentMonth, year: currentYear }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) {
            console.log("ERROR: ", JSON.stringify(error, null, 2));
            return "error";
          }
          console.log(data);
          return (
            <div style={{ marginLeft: 50 }}>
              <h2>
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
