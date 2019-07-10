import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { GET_PUZZLE } from '../utils/queries';
import { buildPlayableBoard } from './Board.utils';
import SolveSpace from './SolveSpace';

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
            const { _id } = userPuzzle;
            const playablePuzzle = buildPlayableBoard(puzzle, userPuzzle);
            return (
              <SolveSpace
                puzzle={playablePuzzle}
                userPuzzle={_id}
                {...userPuzzle}
              />
            );
          }
        }
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
