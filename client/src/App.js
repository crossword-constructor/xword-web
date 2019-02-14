import React from "react";
import { Switch, Route } from "react-router-dom";
import { Signup } from "./Signup";
import { Workspace, Solvespace } from "./Workspace";
import { Calendar } from "./Calendar";
import { Navbar } from "./Navigation/Navbar";
import Login from "./Login/Login";
import "./reset.css";
const App = props => {
  // console.log(props);
  return (
    <Switch>
      <Navbar />
      <Route exact path="/" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/construct" component={Workspace} />
      <Route path="/solve" component={Solvespace} />
      <Route path="/nyt/solve/:id" component={Solvespace} />
      <Route path="/nyt/calendar" component={Calendar} />
    </Switch>
  );
};

export default App;
