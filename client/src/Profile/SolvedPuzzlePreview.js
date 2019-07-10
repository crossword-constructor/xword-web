import React from 'react';
import PropTypes from 'prop-types';
import Stack from '../Layouts/Stack';
import styles from './SolvedPuzzles.module.css';

const SolvedPuzzlesPreview = ({ stats, DataScroller }) => {
  return (
    <Stack>
      <>
        <div className={styles.container}>
          <div>Stats</div>
          <div className={styles.stats}>
            <div>
              total attempted:
              <div className={styles.number}>{stats.total}</div>
            </div>
            <div>
              total solved: <div className={styles.number}>{stats.solved}</div>
            </div>
            <div>
              total revealed:
              <div className={styles.number}>{stats.revealed}</div>
            </div>
            <div>
              solve rate:
              <div className={styles.number}>
                {(stats.solved / stats.total).toFixed(2) * 100 || 0}%
              </div>
            </div>
          </div>
        </div>
        <div>Recent puzzles</div>
        <div className={styles.row}>{DataScroller}</div>
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
  // puzzles: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     _id: PropTypes.string,
  //     puzzle: PropTypes.shape({
  //       _id: PropTypes.string.isRequired,
  //       date: PropTypes.string.isRequired,
  //     }),
  //     board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  //   }).isRequired
  // ).isRequired,
  // fetchMore: PropTypes.func.isRequired,
  DataScroller: PropTypes.element.isRequired,
};

export default SolvedPuzzlesPreview;
