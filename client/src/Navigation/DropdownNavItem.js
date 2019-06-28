import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './DropdownNavItem.module.css';

const DropdownNavItem = props => {
  const { name, list, headerLink, 'data-testid': dataTestId } = props;
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <Link to={headerLink || ''}>{name}</Link>
      </div>
      <div className={styles.DropdownContent} data-testid={dataTestId}>
        {list.map(item => {
          return (
            <div className={styles.DropdownItem} key={item.name}>
              <Link to={item.link}>{item.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

DropdownNavItem.propTypes = {
  name: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  headerLink: PropTypes.string,
  'data-testid': PropTypes.string,
};

DropdownNavItem.defaultProps = {
  headerLink: null,
  'data-testid': 'dropdownNavItem',
};

export default DropdownNavItem;
