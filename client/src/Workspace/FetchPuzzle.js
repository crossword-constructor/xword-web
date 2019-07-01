import React from 'react';
import PropTypes from 'prop-types';
import { Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { buildPlayableBoard } from './Board.utils';
import SolveSpace from './SolveSpace';

const GET_PUZZLE = gql`
  query PlayablePuzzle($puzzleId: ID) {
    playablePuzzle(_id: $puzzleId) {
      success
      message
      playablePuzzle {
        puzzle {
          _id
          title
          author
          date
          publisher
          board
          clues {
            answer {
              _id
              text
            }
            clue {
              _id
              text
            }
            position
          }
        }
        userPuzzle {
          _id
          board
          time
        }
      }
    }
  }
`;

const FetchPuzzle = ({ match }) => {
  const puzzleId = match.params.id;
  return (
    <Query query={GET_PUZZLE} variables={{ puzzleId }}>
      {({ loading, error, data }) => {
        if (loading) return '...loading';
        if (error) return console.log({ error });
        if (data) {
          const {
            playablePuzzle: { puzzle, userPuzzle, success, message },
          } = data.playablePuzzle;
          if (!success && message) {
            return message;
          }
          if (puzzle && userPuzzle) {
            console.log('query running again');
            console.log({ userPuzzle });
            const { _id, time } = userPuzzle;
            const playablePuzzle = buildPlayableBoard(puzzle, userPuzzle);
            return (
              <ApolloConsumer>
                {client => (
                  <SolveSpace
                    puzzle={playablePuzzle}
                    userPuzzle={_id}
                    startTime={time}
                    client={client}
                  />
                )}
              </ApolloConsumer>
            );
          }
        }

        // console.log({ userPuzzle });
      }}
    </Query>
  );
};

FetchPuzzle.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default FetchPuzzle;
