import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pause.module.css';

const Pause = ({ size, onClick }) => {
  return (
    <svg
      onClick={onClick}
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="pause"
      className={styles.pause}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      height={size}
    >
      <path
        fill="currentColor"
        d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"
      />
    </svg>
  );
};

Pause.propTypes = {
  size: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Pause;
