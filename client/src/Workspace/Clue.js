import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Clues.module.css';

const Clue = ({
  isHighlighted,
  isSecondaryHighlight,
  selectClue,
  position,
  text,
}) => {
  const clueRef = useRef(null);

  if (clueRef.current && (isHighlighted || isSecondaryHighlight)) {
    // @TODO we can't set behavior smooth...only the down column will scroll.
    clueRef.current.scrollIntoView();
  }
  return (
    <li
      ref={clueRef}
      className={isHighlighted ? styles.highlighted : styles.clue}
    >
      <div
        className={
          isSecondaryHighlight
            ? styles.secondaryHighlight
            : styles.secondaryNoHighlight
        }
      />
      <div
        role="button"
        tabIndex="-1"
        className={styles.clueText}
        onClick={selectClue}
        onKeyPress={selectClue}
      >
        <span style={{ fontWeight: 600 }}>{position}</span> {text}
      </div>
    </li>
  );
};

Clue.propTypes = {
  isHighlighted: PropTypes.bool.isRequired,
  isSecondaryHighlight: PropTypes.bool.isRequired,
  selectClue: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Clue;
