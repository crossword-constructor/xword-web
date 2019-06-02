import React from 'react';
import PropTypes from 'prop-types';
// import { Aux } from '../Shared';
import styles from './Clues.module.css';

const Clues = ({ clues, currentClues, selectClue, direction }) => {
  return (
    <>
      <ul className={styles.acrossClues}>
        {Object.keys(clues)
          .filter(clue => clues[clue].position.indexOf('A') > -1)
          .map(clue => (
            <li
              key={clues[clue].position}
              className={
                currentClues[0] === clue && direction === 'across'
                  ? styles.highlighted
                  : styles.clue
              }
            >
              <div
                className={
                  currentClues[0] === clue && direction === 'down'
                    ? styles.secondaryHighlight
                    : styles.secondaryNoHighlight
                }
              />
              <div
                role="button"
                tabIndex="-1"
                className={styles.clueText}
                onClick={() => selectClue(clues[clue])}
                onKeyPress={() => selectClue(clues[clue])}
              >
                <span style={{ fontWeight: 600 }}>{clues[clue].position}</span>{' '}
                {clues[clue].clue}
              </div>
            </li>
          ))}
      </ul>
      <div>{direction}</div>
      <ul className={styles.downClues}>
        {Object.keys(clues)
          .filter(clue => clues[clue].position.indexOf('D') > -1)
          .map(clue => (
            <li
              key={clues[clue].position}
              className={
                currentClues[1] === clue && direction === 'down'
                  ? styles.highlighted
                  : styles.clue
              }
            >
              <div
                className={
                  currentClues[1] === clue && direction === 'across'
                    ? styles.secondaryHighlight
                    : styles.secondaryNoHighlight
                }
              />
              <div
                onClick={() => selectClue(clues[clue])}
                onKeyPress={() => selectClue(clues[clue])}
                className={styles.clueText}
                role="button"
                tabIndex="-1"
              >
                <span style={{ fontWeight: 600 }}>{clues[clue].position}</span>{' '}
                {clues[clue].clue}
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

Clues.propTypes = {
  direction: PropTypes.oneOf(['across', 'down']).isRequired,
  clues: PropTypes.shape({}).isRequired,
  currentClues: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectClue: PropTypes.func.isRequired,
};

export default Clues;
