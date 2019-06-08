import React from 'react';
import PropTypes from 'prop-types';
import Clue from './Clue';
// import { Aux } from '../Shared';
import styles from './Clues.module.css';

const Clues = ({ clues, currentClues, selectClue, direction }) => {
  return (
    <>
      <ul className={styles.acrossClues}>
        {Object.keys(clues)
          .filter(clue => clues[clue].position.indexOf('A') > -1)
          .map(clue => (
            <Clue
              key={clues[clue].position}
              isHighlighted={currentClues[0] === clue && direction === 'across'}
              isSecondaryHighlight={
                currentClues[0] === clue && direction === 'down'
              }
              selectClue={() => selectClue(clues[clue])}
              position={clues[clue].position}
              text={clues[clue].clue}
            />
          ))}
      </ul>
      <ul className={styles.downClues}>
        {Object.keys(clues)
          .filter(clue => clues[clue].position.indexOf('D') > -1)
          .map(clue => (
            <Clue
              key={clues[clue].position}
              isHighlighted={currentClues[1] === clue && direction === 'down'}
              isSecondaryHighlight={
                currentClues[1] === clue && direction === 'across'
              }
              selectClue={() => selectClue(clues[clue])}
              position={clues[clue].position}
              text={clues[clue].clue}
            />
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
