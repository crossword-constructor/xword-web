import React from "react";
import { Switch, Route } from "react-router-dom";
import { Signup } from "./Signup";
import { Workspace, Solvespace } from "./Workspace";
import { NYTCalendar } from "./NYTCalendar";
import Login from "./Login/Login";

const App = props => {
  // console.log(props);
  return (
    <Switch>
      <Route exact path="/" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/construct" component={Workspace} />
      <Route path="/solve" component={Solvespace} />
      <Route path="/nyt/solve/:id" component={Solvespace} />
      <Route path="/nyt/calendar" component={NYTCalendar} />
    </Switch>
  );
};

export default App;
