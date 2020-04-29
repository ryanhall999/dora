import React, { useState, useEffect } from "react";
import { Navbar, Form } from "react-bootstrap";
import { Nav, FormControl, Button } from "react-bootstrap";
import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home";
import Map from "./Map";
import List from "./List";
import LoginScreen from "./LoginScreen";
import axios from "axios";
import Create from "./Create";

export default function Header() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("/loggedIn").then(response => {
      if (response.data.googleid) {
        setUser(response.data);
      }
    });
  }, []);

  const loginText = {
    color: "white"
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <img
          src="https://i.ibb.co/Vx4gMpW/logo-size-invert-2.jpg"
          alt="logo-size-invert-2"
          border="0"
        />
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/" component={Home}>
              Home
            </Nav.Link>
            <Nav.Link href="/map" component={Map}>
              Map
            </Nav.Link>
            <Nav.Link href="/create" component={Create}>
              Create New User
            </Nav.Link>
            <Nav.Link href="/list" component={List}>
              List
            </Nav.Link>
            <Navbar.Text style={loginText}>
              {user.googleid ? <p>Signed in as: {user.name}</p> : null}
            </Navbar.Text>
            <Nav.Link href="/login" component={LoginScreen}>
              {user.googleid ? <Logout /> : <Login />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Nav>
    </Navbar>

    // <Navbar bg="dark" variant="dark" collapseOnSelect>
    //   <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    //   <Nav className="mr-auto">
    //     <Nav.Link href="#home">Home</Nav.Link>
    //     <Nav.Link href="#features">Features</Nav.Link>
    //     <Nav.Link href="#pricing">Pricing</Nav.Link>
    //   </Nav>
    //   <Form inline>
    //     <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    //     <Button variant="outline-info">Search</Button>
    //   </Form>
    // </Navbar>
  );
}
