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
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/construct" component={Workspace} />
        <Route path="/solve/:id" component={Solvespace} />
        <Route path="/nyt/solve/:id" component={Solvespace} />
        <Route path="/calendar" component={Calendar} />
      </Switch>
    </div>
  );
};

export default App;
