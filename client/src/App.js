import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
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
import FileUploadTest from "./pages/FileUploadTest";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import API from "./utils/API";
import UserContext from "./utils/userContext";

function App() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [loggedInState, setLoggedInState] = useState(userInfo ? userInfo : {
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
              <PrivateRoute exact path={["/"]}>
                <Feed />
              </PrivateRoute>
              <PrivateRoute exact path={["/recipe/:id"]}>
                <Recipe />
              </PrivateRoute>
              <PrivateRoute exact path={["/user"]}>
                <UserProfile />
              </PrivateRoute>
              <PrivateRoute exact path={["/find"]}>
                <FindRecipe />
              </PrivateRoute>
              <PrivateRoute exact path={["/post"]}>
                <PostRecipe />
              </PrivateRoute>
              <Route exact path={["/signup"]}>
                <Signup />
              </Route>
              <Route exact path={["/login"]}>
                <Login />
              </Route>
              <Route exact path={["/public/images"]}>
                <Login />
              </Route> 
              <Route exact path={"/upload"}>
                <FileUploadTest/>
              </Route>
            </Switch>
          </Wrapper>
        </div>
      </Router>
    </UserContext.Provider>
  );

  // A wrapper for <Route> that redirects to the login
  // screen if you're not yet authenticated.
  function PrivateRoute({ children, ...rest }) {
    console.log(`Logged in: ${loggedInState.loggedIn}`);
    return (
      <Route
        {...rest}
        render={({ location }) =>
          loggedInState.loggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }
}

export default App;
