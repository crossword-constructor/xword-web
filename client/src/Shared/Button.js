import React from 'react';
import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({ theme, children, onClick }) => {
  return (
    <button className={styles[theme]} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  theme: PropTypes.oneOf(['Main', 'Danger', 'Cancel', 'Light']).isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
