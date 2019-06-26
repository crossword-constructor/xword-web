import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.module.css';

const Input = ({
  autoComplete,
  type,
  name,
  placeholder,
  change,
  onKeyDown,
  value,
  theme,
}) => {
  return (
    <div className={styles.Container}>
      <input
        // ref={this.textInput}
        className={styles[theme]}
        autoComplete={autoComplete}
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={change}
        onKeyDown={onKeyDown}
        value={value}
      />
      <label htmlFor={name} className={styles.Label}>
        {name}
      </label>
    </div>
  );
};

Input.propTypes = {
  autoComplete: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
};

Input.defaultProps = {
  autoComplete: null,
};
export default Input;
