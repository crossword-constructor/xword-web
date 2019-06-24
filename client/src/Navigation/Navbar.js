import React from 'react';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styles from './Navbar.module.css';

const Navbar = () => {
  const USERNAME = gql`
    {
      me {
        _id
        username
      }
    }
  `;

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
        <Query query={USERNAME} fetchPolicy="cache-and-network">
          {({ data }) => {
            return (
              <li>
                <NavLink
                  className={styles.link}
                  to={data ? '/profile' : '/login'}
                  activeClassName={styles.activeLink}
                >
                  {data && data.me ? data.me.username : 'Login'}
                </NavLink>
              </li>
            );
          }}
        </Query>
      </ul>
    </nav>
  );
};

export default Navbar;
