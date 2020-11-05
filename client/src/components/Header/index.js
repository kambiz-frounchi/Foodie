import React, { useState, useEffect, useContext } from "react";
import { Button, Navbar, Nav, Form, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UserContext from "../../utils/userContext";
import API from "../../utils/API";

function Header(props) {

  const { loggedInState, setLoggedInState } = useContext(UserContext);
  const history = useHistory();

  // console.log(`Header loggedIn=${loggedInState.loggedIn}`);
  // console.log(loggedInState);

  const handleLoginLogout = () => {
    console.log(loggedInState.loggedIn);
    if (loggedInState.loggedIn) {
      API.logout()
        .then(() => {
          console.log("logged out");
          history.push("/login");
        })
        .catch((err) => console.log(err));
    }
    localStorage.clear();
    setLoggedInState({ ...loggedInState, loggedIn: !loggedInState.loggedIn });
  };

  if (!loggedInState.loggedIn) return null;

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img
          src={require("./assets/foodie2.png")}
          width="75"
          height="60"
          className="d-inline-block align-top"
          alt="Foodie"
        />
      </Navbar.Brand>

      <Nav className="mr-auto">
        <Nav.Link href="#">{loggedInState.nickname}</Nav.Link>
        <Nav.Link href="/find">Recipe Matcher™</Nav.Link>
        <Nav.Link href="/post">Post a Recipe</Nav.Link>
        <Nav.Link href="#" onClick={handleLoginLogout}>
          {loggedInState.loggedIn ? "logout" : "login"}
        </Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-danger">Search</Button>
      </Form>
    </Navbar>
  );
}

export default Header;
