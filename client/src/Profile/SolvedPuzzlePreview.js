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
          <div className={styles.stats}>
            <div>total attempted: {stats.total}</div>
            <div>total solved: {stats.solved}</div>
            <div> total revealed: {stats.revealed}</div>
            <div>solve %: {(stats.solved / stats.total).toFixed(2)}</div>
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
              onClick={() => console.log('load more puzzles')}
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
    </>
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
};

export default SolvedPuzzlesPreview;
