/* eslint-disable no-unused-vars */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import styles from './App.module.css';
import Signup from './Signup/Signup';
import Workspace from './Workspace/Workspace';
import FetchPuzzle from './Workspace/FetchPuzzle';
import Calendar from './Calendar/Calendar';
import Navbar from './Navigation/Navbar';
import Login from './Login/Login';
import Logout from './Logout/Logout';
import Profile from './Profile/Profile';
import './reset.css';

const App = () => {
  // const VERIFY_LOGGED_IN = gql`
  //   {
  //     verifyLoggedIn {
  //       _id
  //       username
  //     }
  //   }
  // `;
  // console.log(props);
  return (
    // I wonder what the proper way to verify logged in is...
    // presumably, the request for this bundle.js in production will have
    // the cookie attached if the user is logged in...so this is an extra request
    // <Query query={VERIFY_LOGGED_IN}>
    //   {({ loading, error, data }) => {
    //     if (loading) return <div>Loading..</div>;
    // return (
    <div className={styles.app}>
      <Navbar />
      <Switch>
        <div className={styles.page}>
          <Route exact path="/" component={Signup} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/construct" component={Workspace} />
          <Route path="/solve/:id" component={FetchPuzzle} />
          <Route path="/profile" component={Profile} />
          <Route path="/nyt/solve/:id" component={FetchPuzzle} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/logout" component={Logout} />
        </div>
      </Switch>
    </div>
    //     );
    //   }}
    // </Query>
  );
};

export default App;
