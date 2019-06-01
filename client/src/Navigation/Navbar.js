import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <h1 className={styles.logo}>Crossword Constructor</h1>
      <ul className={styles.menu}>
        <li>
          <NavLink
            className={styles.link}
            to="/calendar"
            activeClassName={styles.activeLink}
          >
            Solve
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.link}
            to="/construct"
            activeClassName={styles.activeLink}
          >
            Construct
          </NavLink>
        </li>
        <li>Sign up</li>
      </ul>
    </nav>
  );
};

export default Navbar;
