import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const NYTCalendar = () => {
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

  const monthMap = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
  };
  const BuildYearList = function() {
    let years = [];
    for (let year = 1942; year <= 2019; year++) {
      let months = [];
      for (let month = 1; month <= 12; month++) {
        months.push({
          date: month,
          title: monthMap[month]
        });
      }
      // console.log(years);
      years.push({ date: year, months: months.reverse() });
    }
    return years;
  };

  let yearList = BuildYearList();
  console.log(currentMonth, currentYear);
  return (
    <div style={{ display: "flex" }}>
      <ol>
        {yearList.reverse().map(year => (
          <li key={year.date}>
            {year.date}
            <ol>
              {year.months.map(month => (
                <li
                  key={month.date}
                  onClick={() =>
                    setDate([month.date.toString(), year.date.toString()])
                  }
                >
                  {month.title}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
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
          return data.puzzles[0].date;
        }}
      </Query>
    </div>
  );
};

export default NYTCalendar;
