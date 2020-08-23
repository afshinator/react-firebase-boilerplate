import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Posts from "./components/Posts";
import Authentication from "./components/Authentication";

function App() {
  return (
    <div className="Application">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Authentication />
      <Posts />
    </div>
  );
}

export default App;
