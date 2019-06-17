import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Signup from './Signup/Signup';
import Workspace from './Workspace/Workspace';
import FetchPuzzle from './Workspace/FetchPuzzle';
import Calendar from './Calendar/Calendar';
import Navbar from './Navigation/Navbar';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import './reset.css';

const App = () => {
  const VERIFY_LOGGED_IN = gql`
    {
      verifyLoggedIn {
        id
        username
      }
    }
  `;
  // console.log(props);
  return (
    // I wonder what the proper way to verify logged in is...
    // presumably, the request for this bundle.js in production will have
    // the cookie attached if the user is logged in...so this is an extra request
    <Query query={VERIFY_LOGGED_IN}>
      {({ loading, error, data }) => {
        console.log(error);
        if (loading) return <div>Loading..</div>;
        console.log(data);
        return (
          <>
            <Navbar />
            <div>{error ? error.message : data.username}</div>
            <Switch>
              <Route exact path="/" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/construct" component={Workspace} />
              <Route path="/solve/:id" component={FetchPuzzle} />
              <Route path="/profile" component={Profile} />
              <Route path="/nyt/solve/:id" component={FetchPuzzle} />
              <Route path="/calendar" component={Calendar} />
            </Switch>
          </>
        );
      }}
    </Query>
  );
};

export default App;
