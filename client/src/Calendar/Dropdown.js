import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Dropdown.module.css';

const Dropdown = ({ list, title, select }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ElementList = list.map((item, i) => {
    const colorClass = styles.listItem;
    let backgroundClass = i % 2 === 0 ? styles.background1 : styles.background2;
    if (item.toString() === title.toString())
      backgroundClass = styles.activeBackground;
    const className = [colorClass, backgroundClass].join(' ');
    return (
      <div
        key={item}
        onClick={() => {
          select(item);
          /** @todo replace with custom useTimeout hook */
          setTimeout(() => setIsOpen(false), 600);
        }}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            select(item);
          }
        }}
        tabIndex="-2"
        role="button"
        className={className}
      >
        {item}
      </div>
    );
  });
  // const ddState = listOpen ? classes.Open : classes.Close;
  return (
    <div className={styles.wrapper}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        onKeyPress={e => (e.key === 'Enter' ? setIsOpen(!isOpen) : null)}
        role="button"
        tabIndex="-3"
        className={styles.header}
        data-testid="dropdown"
      >
        <span>{title}</span> <i className="fas fa-caret-down" />
      </div>
      <div className={isOpen ? styles.opened : styles.closed}>
        {ElementList}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  select: PropTypes.func.isRequired,
};

export default Dropdown;
