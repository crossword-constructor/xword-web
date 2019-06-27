import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './DropdownNavItem.module.css';

const DropdownNavItem = props => {
  const { name, list } = props;
  return (
    // eslint-disable-next-line react/destructuring-assignment
    <li className={styles.Container} data-testid={props['data-testid']}>
      <div className={styles.Header}>{name}</div>
      <div className={styles.DropdownContent}>
        {list.map(item => {
          return (
            <div className={styles.DropdownItem} key={item.name}>
              <NavLink
                className={styles.link}
                to={item.link}
                activeClassName={styles.activeLink}
              >
                {item.name}
              </NavLink>
            </div>
          );
        })}
      </div>
    </li>
  );
};

DropdownNavItem.propTypes = {
  name: PropTypes.element.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  'data-testid': PropTypes.string,
};

DropdownNavItem.defaultProps = {
  'data-testid': 'dropdownNavItem',
};

export default DropdownNavItem;
