import React from 'react';
import PropTypes from 'prop-types';
import Stack from '../Layouts/Stack';
import PuzzleIcon from '../Shared/PuzzleIcon';
import styles from './SolvedPuzzles.module.css';

const SolvedPuzzlesPreview = ({ puzzles, stats }) => {
  return (
    <>
      <Stack>
        <>
          <div className={styles.stats}>{stats.total}</div>
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
          </div>
        </>
      </Stack>
      <div
        className={styles.next}
        onClick={() => console.log('load more puzzles')}
        onKeyUp={event =>
          event.key === 'Enter' ? console.log('load more puzzles') : null
        }
        role="button"
        tabIndex="0"
      >
        <i className="fas fa-chevron-right" />
      </div>
    </>
  );
};

SolvedPuzzlesPreview.propTypes = {
  stats: PropTypes.shape({ total: PropTypes.number }).isRequired,
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
};

export default SolvedPuzzlesPreview;
