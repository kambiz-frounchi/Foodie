import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Feed from './pages/Feed';
import FindRecipe from './pages/FindRecipe';
import PostRecipe from './pages/PostRecipe';
import Recipe from './pages/Recipe';
import UserProfile from './pages/UserProfile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from "./components/Header/index";

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Switch>
          <Route exact path={["/"]}>
            <Feed/>
          </Route>
          <Route exact path={["/recipe/:id"]}>
            <Recipe/>
          </Route>
          <Route exact path={["/user"]}>
            <UserProfile/>
          </Route>
          <Route exact path={["/find"]}>
            <FindRecipe/>
          </Route>
          <Route exact path={["/post"]}>
            <PostRecipe/>
          </Route>
          <Route exact path={["/signup"]}>
            <Signup/>
          </Route>
          <Route exact path={["/login"]}>
            <Login/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

/*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
*/