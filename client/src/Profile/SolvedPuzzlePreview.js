import React from 'react';
import PropTypes from 'prop-types';
import Stack from '../Layouts/Stack';
import PuzzleIcon from '../Shared/PuzzleIcon';
import styles from './SolvedPuzzles.module.css';

const SolvedPuzzlesPreview = ({ puzzles }) => {
  console.log({ puzzles });
  return (
    <Stack>
      <h2>Recent puzzles</h2>
      <div className={styles.stats}>
        <div>games played: {puzzles.length}</div>
      </div>
      <div className={styles.Row}>
        {puzzles.map(p => {
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
        })}
      </div>
    </Stack>
  );
};

SolvedPuzzlesPreview.propTypes = {
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
