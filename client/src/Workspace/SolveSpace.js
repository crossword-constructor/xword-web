import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Board, Clues } from "./";
const Solvespace = ({ match }) => {
  let puzzleId = match.params.id;
  const GET_PUZZLE = gql`
    query Puzzle($puzzleId: ID) {
      puzzle(id: $puzzleId) {
        title
        author
        date
        publisher
        board
      }
    }
  `;

  return (
    <Query query={GET_PUZZLE} variables={{ puzzleId }}>
      {({ loading, error, data }) => {
        if (loading) return "...loading";
        if (error) return `ERROR ${JSON.stringify(error, null, 2)}`;
        console.log(data);
        return (
          <div>
            {data.puzzle.title}
            {data.puzzle.author}
            <Board initialBoard={data.puzzle.board} />
          </div>
        );
      }}
    </Query>
  );
};

export default Solvespace;
