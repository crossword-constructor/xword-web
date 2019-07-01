import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './DropdownMenu.module.css';

const DropdownMenu = props => {
  const { name, list, headerLink, offSet, 'data-testid': dataTestId } = props;
  return (
    <div className={styles.Container}>
      <div className={styles.Header}>
        {headerLink ? <Link to={headerLink || ''}>{name}</Link> : name}
      </div>
      <div
        className={styles.DropdownContent}
        style={{ top: offSet }}
        data-testid={dataTestId}
      >
        {list.map(item => {
          return (
            <div className={styles.DropdownItem} key={item.name}>
              {item.link ? (
                <Link to={item.link || ''}>{item.name}</Link>
              ) : (
                <button type="button" onClick={item.onClick}>
                  {item.name}
                </button>
              )}
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
      onClick: PropTypes.func,
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
