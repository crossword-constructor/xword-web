import React from 'react';
import PropTypes from 'prop-types';
import styles from './Toolbar.module.css';

const Toolbar = ({ title, author, Clock, DropdownMenu }) => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.menuItem}>{title}</div>
        <div className={styles.menuItem}>{author}</div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.menuItem}>{Clock}</div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.menuItem}>{DropdownMenu}</div>
        <div className={styles.menuItem}>Hint</div>
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  Clock: PropTypes.element.isRequired,
  DropdownMenu: PropTypes.element.isRequired,
};

Toolbar.defaultProps = {
  title: null,
  author: null,
};

export default Toolbar;
