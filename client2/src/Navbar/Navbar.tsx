import React from 'react';
import { NavLink } from 'react-router-dom';
// import DropdownMenu from '../Shared/DropdownMenu';
import { getCurrentMonthAndYear } from '../Utils/calendar';
import styled from '@emotion/styled';

export const Navbar = () => {
  const { month, year } = getCurrentMonthAndYear();
  // const USERNAME = gql`
  //   {
  //     profileInfo {
  //       success
  //       message
  //       user {
  //         _id
  //         username
  //       }
  //     }
  //   }
  // `;

  const LoginLink = (
    <NavLink
      to="/Login"
      // className={styles.link}
      // activeClassName={styles.activeLink}
    >
      Login
    </NavLink>
  );
  return (
    <NavContainer>
      <NavLink to="/">
        <Title>
          <div>C</div>
          <div>r</div>
          <div>o</div>
          <div>s</div>
          <div>s</div>
          <div>w</div>
          <div>o</div>
          <div>r</div>
          <div>d</div>
          <div />
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
        </Title>
      </NavLink>
      <RightNav
      // className={styles.menu}
      >
        <NavLink
          to={`/calendar?month=${month}&year=${year}`}
          // activeClassName={styles.activeLink}
        >
          Solve
        </NavLink>
        <NavLink
          to="/construct"
          // activeClassName={styles.activeLink}
        >
          Construct
        </NavLink>
        {LoginLink}
        {/* <Query query={USERNAME} name="profileInfo">
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
        </Query> */}
      </RightNav>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ theme }) => theme.sizes.NAV_HEIGHT}rem;
  padding: 0 24px;
  > a {
    text-decoration: none;
    color: black;
  }
`;

const Title = styled.h1`
  display: flex;
  text-decoration: none;
  color: black;
  > div {
    border: 1px solid black;
    height: 40px;
    width: 40px;
    line-height: 40px;
    text-align: center;
    text-transform: capitalize;
    color: white;
    background-color: white;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
      1px 1px 0 #000;
  }
  > :last-child {
    background-color: black;
  }
`;

const RightNav = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  max-width: 600px;
  > * {
    color: #444;
    text-decoration: none;
    font-weight: 700;
    font-size: 20px;
    /* color: white; */
    background-color: white;
    transition: 0.2s;
    /* text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; */
    :hover {
      color: #406ac5;
      /* font-weight: 800; */
      text-shadow: none;
    }
  }
`;
