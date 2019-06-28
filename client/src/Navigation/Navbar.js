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
        _id
        username
      }
    }
  `;
  console.log('navbar rendeintg');
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
        <Query
          query={USERNAME}
          name="profileInfo"
          fetchPolicy="cache-and-network"
        >
          {({ data, error, loading }) => {
            console.log(error);
            console.log(loading);
            console.log('query: ', data);
            return data && data.profileInfo ? (
              <DropdownNavItem
                name={data.profileInfo ? data.profileInfo.username : 'Profile'}
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
                  to="/Login"
                  className={styles.link}
                  activeClassName={styles.activeLink}
                >
                  Login
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
