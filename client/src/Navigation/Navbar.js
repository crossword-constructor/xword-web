import React from 'react';
import { NavLink } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styles from './Navbar.module.css';
import DropdownMenu from '../Shared/DropdownMenu';

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
        <h1 className={styles.logo}>
          <div>C</div>
          <div>r</div>
          <div>o</div>
          <div>s</div>
          <div>s</div>
          <div>w</div>
          <div>o</div>
          <div>r</div>
          <div>d</div>
          <div className={styles.blackSquare}> </div>
          {/* <div>C</div>
          <div>o</div>
          <div>n</div>
          <div>s</div>
          <div>t</div>
          <div>r</div>
          <div>u</div>
          <div>c</div>
          <div>t</div>
          <div>o</div>
          <div>r</div> */}
        </h1>
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
                <DropdownMenu
                  name={username || 'Profile'}
                  list={[
                    {
                      name: 'profile',
                      link: '/profile',
                    },
                    { name: 'logout', link: '/logout' },
                  ]}
                  headerLink="/profile"
                  offSet={20}
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
