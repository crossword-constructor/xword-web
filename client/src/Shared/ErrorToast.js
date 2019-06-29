import React from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorToast.module.css';

const ErrorToast = ({ errorMessage }) => {
  return (
    <div className={errorMessage ? styles.ErrorMessage : styles.HiddenMessage}>
      {errorMessage}
    </div>
  );
};

ErrorToast.propTypes = {
  errorMessage: PropTypes.string,
};

ErrorToast.defaultProps = {
  errorMessage: null,
};
export default ErrorToast;
