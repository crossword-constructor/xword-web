import React from "react";
import styles from "./Navbar.module.css";
export const Navbar = () => {
  return (
    <nav className={styles.container}>
      <h1 className={styles.logo}>Crossword Constructor</h1>
      <ul className={styles.menu}>
        <li>Solve</li>
        <li>Construct</li>
        <li>Sign up</li>
      </ul>
    </nav>
  );
};
