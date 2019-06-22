import React from 'react';
import PropTypes from 'prop-types';

import styles from './Sidebar.module.css';

const SidebarLayout = ({ sideBar, mainContent, breakPointPercent }) => {
  return (
    <div className={styles.Page}>
      <div className={styles.Sidebar}>{sideBar}</div>
      <div
        className={styles.MainContent}
        style={{ minWidth: `calc(${breakPointPercent}% - 1rem)` }}
      >
        {mainContent}
      </div>
    </div>
  );
};

SidebarLayout.propTypes = {
  sideBar: PropTypes.element.isRequired,
  mainContent: PropTypes.element.isRequired,
  breakPointPercent: PropTypes.number,
};

SidebarLayout.defaultProps = {
  breakPointPercent: 50,
};
export default SidebarLayout;
