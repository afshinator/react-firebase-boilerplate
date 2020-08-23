import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Posts from "./components/Posts";
import Authentication from "./components/Authentication";

import { Switch, Route, Link } from "react-router-dom";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="Application">
      <Link to="/">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </Link>
      <Authentication />
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route exact path="/profile" component={UserProfile} />
      </Switch>
      <Posts />
    </div>
  );
}

export default App;
