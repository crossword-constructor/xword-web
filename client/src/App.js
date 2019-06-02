import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signup from './Signup/Signup';
import Workspace from './Workspace/Workspace';
import FetchPuzzle from './Workspace/FetchPuzzle';
import Calendar from './Calendar/Calendar';
import Navbar from './Navigation/Navbar';
import Login from './Login/Login';
import './reset.css';

const App = () => {
  // console.log(props);
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/construct" component={Workspace} />
        <Route path="/solve/:id" component={FetchPuzzle} />
        <Route path="/nyt/solve/:id" component={FetchPuzzle} />
        <Route path="/calendar" component={Calendar} />
      </Switch>
    </div>
  );
};

export default App;
