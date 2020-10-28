import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Feed from "./pages/Feed";
import FindRecipe from "./pages/FindRecipe";
import PostRecipe from "./pages/PostRecipe";
import Recipe from "./pages/Recipe";
import UserProfile from "./pages/UserProfile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import API from "./utils/API";
import UserContext from "./utils/userContext";

function App() {
  const [loggedInState, setLoggedInState] = useState({
    loggedIn: false,
    email: "User",
  });

  return (
    <UserContext.Provider value={{ loggedInState, setLoggedInState }}>
      <Router>
        <div>
          <Wrapper>
            <Header />
            <Switch>
              <Route exact path={["/"]}>
                <Feed />
              </Route>
              <Route exact path={["/recipe/:id"]}>
                <Recipe />
              </Route>
              <Route exact path={["/user"]}>
                <UserProfile />
              </Route>
              <Route exact path={["/find"]}>
                <FindRecipe />
              </Route>
              <Route exact path={["/post"]}>
                <PostRecipe />
              </Route>
              <Route exact path={["/signup"]}>
                <Signup />
              </Route>
              <Route exact path={["/login"]}>
                <Login />
              </Route>
            </Switch>
          </Wrapper>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
