import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './DropdownMenu.module.css';

const DropdownMenu = props => {
  const { name, list, headerLink, offSet, 'data-testid': dataTestId } = props;
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        <Link to={headerLink || ''}>{name}</Link>
      </div>
      <div
        className={styles.DropdownContent}
        style={{ top: offSet }}
        data-testid={dataTestId}
      >
        {list.map(item => {
          return (
            <div className={styles.DropdownItem} key={item.name}>
              <Link to={item.link || ''}>{item.name}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

DropdownMenu.propTypes = {
  name: PropTypes.string.isRequired,
  offSet: PropTypes.number,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  headerLink: PropTypes.string,
  'data-testid': PropTypes.string,
};

DropdownMenu.defaultProps = {
  offSet: 12,
  headerLink: null,
  'data-testid': 'dropdownNavItem',
};

export default DropdownMenu;
