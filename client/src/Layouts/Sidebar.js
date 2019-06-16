import React from 'react';
import PropTypes from 'prop-types';

import styles from './Sidebar.module.css';

const SidebarLayout = ({ sideBar, mainContent }) => {
  return (
    <div className={styles.Page}>
      <div className={styles.Sidebar}>{sideBar}</div>
      <div className={styles.MainContent}>{mainContent}</div>
    </div>
  );
};

SidebarLayout.propTypes = {
  sideBar: PropTypes.element.isRequired,
  mainContent: PropTypes.element.isRequired,
};

export default SidebarLayout;
