import React from 'react';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styles from './Navbar.module.css';
import DropdownNavItem from './DropdownNavItem';

const Navbar = () => {
  const USERNAME = gql`
    {
      profileInfo {
        success
        message
        user {
          _id
          username
        }
      }
    }
  `;

  const LoginLink = (
    <li>
      <NavLink
        to="/Login"
        className={styles.link}
        activeClassName={styles.activeLink}
      >
        Login
      </NavLink>
    </li>
  );
  return (
    <nav className={styles.container}>
      <NavLink to="/">
        <h1 className={styles.logo}>Crossword Constructor</h1>
      </NavLink>
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
        <Query query={USERNAME} name="profileInfo">
          {({ data }) => {
            if (data && data.profileInfo) {
              const {
                profileInfo: { user, success, message },
              } = data;
              if (!success && message) {
                return LoginLink;
              }

              const { username } = user;
              return (
                <DropdownNavItem
                  name={username || 'Profile'}
                  list={[
                    {
                      name: 'profile',
                      link: '/profile',
                    },
                    { name: 'logout', link: '/logout' },
                  ]}
                  headerLink="/profile"
                />
              );
            }
            return LoginLink;
          }}
        </Query>
      </ul>
    </nav>
  );
};

export default Navbar;
