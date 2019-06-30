import React from 'react';
import PropTypes from 'prop-types';

import styles from './Sidebar.module.css';

const SidebarLayout = ({
  sideBar,
  mainContent,
  breakPointPercent,
  heightsAreEqual,
}) => {
  console.log({ heightsAreEqual });
  return (
    <div className={styles.Page}>
      <div className={styles.Sidebar}>{sideBar}</div>
      <div
        className={styles.MainContent}
        style={{
          minWidth: `calc(${breakPointPercent}% - 1rem)`,
          alignItems: heightsAreEqual ? 'stretch' : 'flexStart',
        }}
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
  heightsAreEqual: PropTypes.bool,
};

SidebarLayout.defaultProps = {
  breakPointPercent: 50,
  heightsAreEqual: false,
};
export default SidebarLayout;
