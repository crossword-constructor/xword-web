import React from 'react';
import PropTypes from 'prop-types';
import styles from './PuzzleList.module.css';
import Stack from '../Layouts/Stack';
import PuzzleIcon from '../Shared/PuzzleIcon';

const PuzzleList = ({ puzzles, title }) => {
  return (
    <Stack>
      <h3 className={styles.Title}>{title}</h3>
      <div className={styles.PuzzleList}>
        {puzzles.map(puzzle => (
          <PuzzleIcon
            key={puzzle.id}
            name={puzzle.name}
            author={puzzle.author}
          />
        ))}
      </div>
    </Stack>
  );
};

PuzzleList.propTypes = {
  title: PropTypes.string,
  puzzles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      author: PropTypes.string,
    })
  ).isRequired,
};

PuzzleList.defaultProps = {
  title: null,
};
export default PuzzleList;
