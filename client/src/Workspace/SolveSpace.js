import React, { useState, useEffect } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styles from './Board.module.css';
import { Board, Clues } from './';

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

const Solvespace = props => {
  let [currentClue, setClue] = useState('1A');
  let puzzleId = props.match.params.id;
  // console.log("what is causing this to rerender? ");
  // console.log(props);
  return (
    <Query query={GET_PUZZLE} variables={{ puzzleId }}>
      {({ loading, error, data }) => {
        if (loading) return '...loading';
        if (error) return `ERROR ${JSON.stringify(error, null, 2)}`;
        console.log(data.puzzle.clues);
        return (
          <div className={styles.page}>
            {data.puzzle.title}
            {data.puzzle.author}
            <div className={styles.container}>
              <Board
                initialBoard={data.puzzle.board}
                currentClue={currentClue}
                setClue={setClue}
              />
              <div className={styles.clues}>
                <Clues
                  clues={data.puzzle.clues}
                  setClue={setClue}
                  currentClue={currentClue}
                />
              </div>
            </div>
          </div>
        );
      }}
    </Query>
  );
};

export default Solvespace;
