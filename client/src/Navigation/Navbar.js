import React from 'react';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styles from './Navbar.module.css';
import DropdownNavItem from './DropdownNavItem';

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
        <li className={styles.link}>
          <NavLink to="/calendar" activeClassName={styles.activeLink}>
            Solve
          </NavLink>
        </li>
        <li className={styles.link}>
          <NavLink to="/construct" activeClassName={styles.activeLink}>
            Construct
          </NavLink>
        </li>
        <Query query={USERNAME}>
          {({ data }) => {
            return data ? (
              <DropdownNavItem
                name={data && data.me ? data.me.username : 'Login'}
                list={[
                  {
                    name: 'profile',
                    link: '/profile',
                  },
                  { name: 'logout', link: '/logout' },
                ]}
              />
            ) : (
              <li>
                <NavLink
                  className={styles.link}
                  activeClassName={styles.activeLink}
                />
              </li>
            );
          }}
        </Query>
      </ul>
    </nav>
  );
};

export default Navbar;
