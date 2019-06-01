import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { buildPlayableBoard } from './Board.utils';
import styles from './Board.module.css';
import Board from './Board';
import Clues from './Clues';

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

const Solvespace = ({ match }) => {
  const [currentClue, setClue] = useState('1A');
  const puzzleId = match.params.id;

  // useEffect(() => {
  // console.log(initialBoard);
  // console.log('playable board: ', board);
  // updateBoard(playableBoard);
  // }, [initialBoard]);

  // console.log("what is causing this to rerender? ");
  // console.log(props);
  return (
    <Query query={GET_PUZZLE} variables={{ puzzleId }}>
      {({ loading, error, data }) => {
        if (loading) return '...loading';
        if (error) return `ERROR ${JSON.stringify(error, null, 2)}`;
        const { playableBoard, clues } = buildPlayableBoard(data.puzzle);
        return (
          <div className={styles.page}>
            {data.puzzle.title}
            {data.puzzle.author}
            <div className={styles.container}>
              <Board
                playableBoard={playableBoard}
                currentClue={currentClue}
                setClue={setClue}
              />
              <div className={styles.clues}>
                <Clues
                  clues={clues}
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

Solvespace.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Solvespace;
