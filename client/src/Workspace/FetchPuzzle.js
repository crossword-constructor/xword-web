import React from 'react';
import PropTypes from 'prop-types';
import { Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { buildPlayableBoard } from './Board.utils';
import SolveSpace from './SolveSpace';

const GET_PUZZLE = gql`
  query Puzzle($puzzleId: ID) {
    puzzle(id: $puzzleId) {
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
  }
`;

const FetchPuzzle = ({ match }) => {
  const puzzleId = match.params.id;
  return (
    <Query query={GET_PUZZLE} variables={{ puzzleId }}>
      {({ loading, error, data }) => {
        if (loading) return '...loading';
        if (error) return `ERROR ${JSON.stringify(error, null, 2)}`;
        const puzzle = buildPlayableBoard(data.puzzle);
        return (
          <ApolloConsumer>
            {client => <SolveSpace puzzle={puzzle} client={client} />}
          </ApolloConsumer>
        );
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
