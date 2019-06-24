import React from 'react';
import PropTypes from 'prop-types';
import PuzzleIcon from '../Shared/PuzzleIcon';

const SolvedPuzzlesPreview = ({ puzzles }) => {
  return (
    <div>
      <h2>Solved puzzles</h2>
      <div>
        {puzzles.map(p => (
          <PuzzleIcon
            id={p.puzzle._id}
            key={p._id}
            date={p.puzzle.date}
            size={50}
          />
        ))}
      </div>
    </div>
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
