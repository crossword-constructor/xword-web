import React from 'react';
import PropTypes from 'prop-types';
// import { Aux } from '../Shared';
import styles from './Clues.module.css';

const Clues = ({ clues, currentClue, setClue }) => {
  return (
    <>
      <ul className={styles.acrossClues}>
        {clues
          .filter(clue => clue.position.indexOf('A') > -1)
          .map(clue => (
            <li
              key={clue.position}
              className={
                currentClue === clue.position ? styles.highlighted : styles.clue
              }
            >
              <div
                role="button"
                tabIndex="-1"
                onClick={() => setClue(clue.position)}
                onKeyPress={() => setClue(clue.position)}
              >
                <span style={{ fontWeight: 600 }}>{clue.position}</span>{' '}
                {clue.clue}
              </div>
            </li>
          ))}
      </ul>
      <ul className={styles.downClues}>
        {clues
          .filter(clue => clue.position.indexOf('D') > -1)
          .map(clue => (
            <li
              key={clue.position}
              className={
                currentClue === clue.position ? styles.highlighted : styles.clue
              }
            >
              <div
                onClick={() => setClue(clue.position)}
                onKeyPress={() => setClue(clue.position)}
                role="button"
                tabIndex="-1"
              >
                <span style={{ fontWeight: 600 }}>{clue.position}</span>{' '}
                {clue.clue}
              </div>
            </li>
          ))}
      </ul>
    </>
  );
};

Clues.propTypes = {
  clues: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentClue: PropTypes.string.isRequired,
  setClue: PropTypes.func.isRequired,
};

export default Clues;
