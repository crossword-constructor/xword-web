import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styles from "./Board.module.css";
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
        clues {
          answer
          clue
          position
        }
      }
    }
  `;
  console.log("match.params.id ", match.params.id);

  return (
    <Query query={GET_PUZZLE} variables={{ puzzleId }}>
      {({ loading, error, data }) => {
        if (loading) return "...loading";
        if (error) return `ERROR ${JSON.stringify(error, null, 2)}`;
        return (
          <div className={styles.page}>
            {data.puzzle.title}
            {data.puzzle.author}
            <div className={styles.container}>
              <Board initialBoard={data.puzzle.board} />
              <div className={styles.clues}>
                <ul className={styles.acrossClues}>
                  {data.puzzle.clues
                    .filter(clue => clue.position.indexOf("A") > -1)
                    .map(clue => (
                      <li>
                        <span style={{ fontWeight: 600 }}>{clue.position}</span>{" "}
                        {clue.clue}
                      </li>
                    ))}
                </ul>
                <ul className={styles.downClues}>
                  {data.puzzle.clues
                    .filter(clue => clue.position.indexOf("D") > -1)
                    .map(clue => (
                      <li>
                        <span style={{ fontWeight: 600 }}>{clue.position}</span>{" "}
                        {clue.clue}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Solvespace;
