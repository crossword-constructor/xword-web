import React from 'react';
import PropTypes from 'prop-types';
import DropdownMenu from '../Shared/DropdownMenu';
import styles from './Toolbar.module.css';

const Toolbar = ({ title, author }) => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.menuItem}>{title}</div>
        <div className={styles.menuItem}>{author}</div>
      </div>
      <div className={styles.subContainer}>
        <div className={styles.menuItem}>
          <DropdownMenu
            name="Reveal"
            list={[{ name: 'square' }, { name: 'word' }, { name: 'puzzle' }]}
            offSet={18}
          />
        </div>
        <div className={styles.menuItem}>Hint</div>
      </div>
    </div>
  );
};

Toolbar.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
};

Toolbar.defaultProps = {
  title: null,
  author: null,
};

export default Toolbar;
