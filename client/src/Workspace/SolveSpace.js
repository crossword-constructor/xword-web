import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Board, Clues } from "./";
const Solvespace = ({ puzzleId }) => {
  const GET_PUZZLE = gql`
    query Puzzle($puzzleId: ID) {
      puzzle(id: $puzzleId) {
        title
        author
        date
        publisher
        board
        clueAnswers
      }
    }
  `;

  return (
    <Query query={GET_PUZZLE} variables={{ puzzleId }}>
      {({ loading, error, data }) => {
        if (loading) return "...loading";
        if (error) return `ERROR ${error}`;
        return (
          <div>
            {/* <Board board={data.board} /> */}
            <Clues clues={data.clueAnswers} />
          </div>
        );
      }}
    </Query>
  );
};

export default Solvespace;
