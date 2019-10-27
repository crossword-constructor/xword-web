import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Clues.module.css';

const Clue = ({
  isHighlighted,
  isSecondaryHighlight,
  selectClue,
  position,
  text,
  isPlaying,
}) => {
  const clueRef = useRef(null);

  useEffect(() => {
    if (clueRef.current && (isHighlighted || isSecondaryHighlight)) {
      // @TODO we can't set behavior smooth...only the down column will scroll.'
      // if (isSecondaryHighlight) {
      //   setTimeout(() => {
      //     console.log('scrolling secondary');
      clueRef.current.scrollIntoView();
      //   }, 260);
      // } else if (isHighlighted) {
      //   console.log('scrolling primary');
      //   clueRef.current.scrollIntoView({ behavior: 'smooth' });
      // }
    }
  }, [isHighlighted, isSecondaryHighlight]);

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
        className={isPlaying ? styles.clueText : styles.hiddenClueText}
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
  isPlaying: PropTypes.bool.isRequired,
};

export default React.memo(Clue);
