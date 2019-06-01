import React from 'react';
import PropTypes from 'prop-types';
// import { Aux } from '../Shared';
import styles from './Clues.module.css';

const Clues = ({ clues, currentClue, setClue }) => {
  return (
    <>
      <ul className={styles.acrossClues}>
        {Object.keys(clues)
          .filter(clue => clues[clue].position.indexOf('A') > -1)
          .map(clue => (
            <li
              key={clues[clue].position}
              className={
                currentClue === clues[clue].position
                  ? styles.highlighted
                  : styles.clue
              }
            >
              <div
                role="button"
                tabIndex="-1"
                onClick={() => setClue(clues[clue].position)}
                onKeyPress={() => setClue(clues[clue].position)}
              >
                <span style={{ fontWeight: 600 }}>{clues[clue].position}</span>{' '}
                {clues[clue].clue}
              </div>
            </li>
          ))}
      </ul>
      <ul className={styles.downClues}>
        {Object.keys(clues)
          .filter(clue => clues[clue].position.indexOf('D') > -1)
          .map(clue => (
            <li
              key={clues[clue].position}
              className={
                currentClue === clues[clue].position
                  ? styles.highlighted
                  : styles.clue
              }
            >
              <div
                onClick={() => setClue(clues[clue].position)}
                onKeyPress={() => setClue(clues[clue].position)}
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
  clues: PropTypes.shape({}).isRequired,
  currentClue: PropTypes.string.isRequired,
  setClue: PropTypes.func.isRequired,
};

export default Clues;
