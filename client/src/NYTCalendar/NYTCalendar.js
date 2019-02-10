import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const NYTCalendar = () => {
  const [currentDate, Date] = useState("/2/1942");

  const FETCH_PUZZLES = gql`
    query Puzzle($id: ID) {
      puzzle(id: $id) {
        id
        author
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
          title: monthMap[month],
          link: `${month}/${year}`
        });
      }
      // console.log(years);
      years.push({ year, months: months.reverse() });
    }
    return years;
  };

  let yearList = BuildYearList();
  console.log(yearList);
  return (
    <div>
      <ol>
        {yearList.reverse().map(year => (
          <li key={year.year}>
            {year.year}
            <ol>
              {year.months.map(month => (
                <li key={month.title}>{month.title}</li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
      <Query query={FETCH_PUZZLES} variables={{ date: currentDate }}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) {
            console.log("ERROR: ", error);
            return "error";
          }
          console.log(data);
          return data.puzzle.date;
        }}
      </Query>
    </div>
  );
};

export default NYTCalendar;
