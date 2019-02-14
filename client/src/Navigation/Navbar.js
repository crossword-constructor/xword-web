import React from "react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
export const Navbar = () => {
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
        <li>Construct</li>
        <li>Sign up</li>
      </ul>
    </nav>
  );
};
