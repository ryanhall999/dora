import React from "react";
import { Navbar, Form } from "react-bootstrap";
import { Nav, FormControl, Button } from "react-bootstrap";
import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home";
import Map from "./Map";
import LoginScreen from "./LoginScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">HeadCount Discount</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/" component={Home}>
          Home
        </Nav.Link>
        <Nav.Link href="/login" component={LoginScreen}>
          Login
        </Nav.Link>
        <Nav.Link href="/map" component={Map}>
          Map
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
