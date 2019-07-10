/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withApollo, Query } from 'react-apollo';
import Stack from '../Layouts/Stack';
import PuzzleIcon from '../Shared/PuzzleIcon';
import DataScroller from './DataScroller';
import styles from './SolvedPuzzles.module.css';

const SolvedPuzzlesPreview = ({ puzzles, stats, fetchMore }) => {
  return (
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
          <DataScroller
            data={puzzles}
            fetchMore={fetchMore}
            noInView={5}
            dataLength={stats.total}
          />
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
