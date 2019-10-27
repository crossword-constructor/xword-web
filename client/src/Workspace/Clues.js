import React from 'react';
import PropTypes from 'prop-types';
import Clue from './Clue';
// import
import styles from './Clues.module.css';

/** consider recomposing this so we dont have to drill props down this far */
const Clues = ({ clues, currentClues, selectClue, direction, isPlaying }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>Across</div>
        <div className={styles.scrollContainer}>
          <ul className={styles.clues}>
            {Object.keys(clues)
              .filter(clue => clues[clue].position.indexOf('A') > -1)
              .map(clue => (
                <Clue
                  key={clues[clue].position}
                  isPlaying={isPlaying}
                  isHighlighted={
                    currentClues[0] === clue && direction === 'across'
                  }
                  isSecondaryHighlight={
                    currentClues[0] === clue && direction === 'down'
                  }
                  selectClue={() => selectClue(clues[clue])}
                  position={clues[clue].position}
                  text={clues[clue].clue.text}
                />
              ))}
          </ul>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.title}>Down</div>
        <div className={styles.scrollContainer}>
          <ul className={styles.clues}>
            {Object.keys(clues)
              .filter(clue => clues[clue].position.indexOf('D') > -1)
              .map(clue => (
                <Clue
                  key={clues[clue].position}
                  isPlaying={isPlaying}
                  isHighlighted={
                    currentClues[1] === clue && direction === 'down'
                  }
                  isSecondaryHighlight={
                    currentClues[1] === clue && direction === 'across'
                  }
                  selectClue={() => selectClue(clues[clue])}
                  position={clues[clue].position}
                  text={clues[clue].clue.text}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

Clues.propTypes = {
  direction: PropTypes.oneOf(['across', 'down']).isRequired,
  clues: PropTypes.shape({}).isRequired,
  currentClues: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectClue: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default Clues;
