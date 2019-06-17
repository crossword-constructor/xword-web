import React from 'react';
import PropTypes from 'prop-types';
import styles from './Stack.module.css';

const StackLayout = ({ children }) => {
  return <div className={styles.Stack}>{children}</div>;
};

StackLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
export default StackLayout;
