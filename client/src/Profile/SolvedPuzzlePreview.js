/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withApollo, Query } from 'react-apollo';
import Stack from '../Layouts/Stack';
import PuzzleIcon from '../Shared/PuzzleIcon';
import styles from './SolvedPuzzles.module.css';

const SOLVED_PUZZLES = gql`
  query getSolvedPuzzles($cursor: String) {
    getSolvedPuzzles(cursor: $cursor) {
      success
      message
      solvedPuzzles {
        _id
        board
        puzzle {
          _id
          date
        }
        updatedAt
      }
    }
  }
`;

const SolvedPuzzlesPreview = ({ puzzles, stats, fetchMore }) => {
  // const requery = () => {
  //   client.query({
  //     query: SOLVED_PUZZLES,
  //     variables: {
  //       cursor: puzzles[puzzles.length - 1].updatedAt,
  //     },
  //   });
  // };
  return (
    // <Query query={SOLVED_PUZZLES} variables={{ cursor: '1562368206326' }}>
    //   {({ data, loading, error }) => {
    //     console.log(JSON.stringify({ data, loading, error }));
    //     if (error) {
    //       return console.log(error);
    //     }
    //     return (
    <Stack>
      <>
        <div className={styles.stats}>
          <div>total attempted: {stats.total}</div>
          <div>total solved: {stats.solved}</div>
          <div> total revealed: {stats.revealed}</div>
          <div>
            solve rate: {(stats.solved / stats.total).toFixed(2) * 100}%
          </div>
        </div>
        <div>Recent puzzles</div>
        <div className={styles.row}>
          <div className={styles.puzzleRow}>
            {puzzles.length > 0 ? (
              puzzles.map(p => {
                // let fillPercent = 0;
                // let total = p.board.length * p
                return (
                  <PuzzleIcon
                    id={p.puzzle._id}
                    key={p._id}
                    date={p.puzzle.date}
                    fillPercent={0}
                    size={50}
                  />
                );
              })
            ) : (
              <div>You dont have any recent puzzles yet</div>
            )}
          </div>
          <div
            className={styles.next}
            onClick={() =>
              fetchMore({
                query: SOLVED_PUZZLES,
                variables: { cursor: puzzles[puzzles.length - 1].updatedAt },
                updateQuery: (previousResult, { fetchMoreResult }) => {
                  console.log({ previousResult });
                  console.log(fetchMoreResult.getSolvedPuzzles);
                  return {
                    profileInfo: {
                      ...previousResult.profileInfo,
                      user: {
                        ...previousResult.profileInfo.user,
                        solvedPuzzles: [
                          ...fetchMoreResult.getSolvedPuzzles.solvedPuzzles,
                          ...previousResult.profileInfo.user.solvedPuzzles,
                        ],
                      },
                      __typename: previousResult.profileInfo.__typename,
                    },
                  };
                },
              })
            }
            onKeyUp={event =>
              event.key === 'Enter' ? console.log('load more puzzles') : null
            }
            role="button"
            tabIndex="0"
          >
            <i className="fas fa-chevron-right" />
          </div>
        </div>
      </>
    </Stack>
    //     );
    //   }}
    // </Query>
  );
};

SolvedPuzzlesPreview.propTypes = {
  stats: PropTypes.shape({
    total: PropTypes.number.isRequired,
    solved: PropTypes.number.isRequired,
    revealed: PropTypes.number.isRequired,
  }).isRequired,
  puzzles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      puzzle: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
      board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    }).isRequired
  ).isRequired,
  fetchMore: PropTypes.func.isRequired,
};

export default withApollo(SolvedPuzzlesPreview);
