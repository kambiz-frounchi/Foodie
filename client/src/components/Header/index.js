import React, { useState, useEffect, } from "react";
import { Button, Navbar, Nav, Form, FormControl, } from 'react-bootstrap';


function Header () {
    return( 
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
      <img
        src={require('./foodie2.png')}
        width="75"
        height="60"
        className="d-inline-block align-top"
        alt="Foodie"
      />
    </Navbar.Brand>
    
    <Nav className="mr-auto">
      <Nav.Link href="#features">User</Nav.Link>
      <Nav.Link href="#pricing">Log In</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-danger">Search</Button>
    </Form>
  </Navbar> )
}

export default Header;