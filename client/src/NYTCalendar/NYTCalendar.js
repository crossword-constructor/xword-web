import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const NYTCalendar = () => {
  const [currentMonth, setYear] = useState("/2/1942");

  const FETCH_PUZZLES = gql`
    query Puzzle($id: ID) {
      puzzle(id: $id) {
        id
        author
        date
      }
    }
  `;

  return (
    <div>
      <ol>
        <li>1942</li>
        <li>1943</li>
        <li>1944</li>
      </ol>
      <Query query={FETCH_PUZZLES} variables={{ id: 1 }}>
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
