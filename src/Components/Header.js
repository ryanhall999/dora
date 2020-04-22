import React from "react";
import { Navbar, Form } from "react-bootstrap";
import { Nav, FormControl, Button } from "react-bootstrap";
import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home";
import Map from "./Map";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">HeadCount Discount</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link exact path="/" component={Home}>
          Home
        </Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="/map" component={Map}>
          Map
        </Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  );
}

// <Router>
// <Switch>
//   <Route exact path="/" component={Home} />
//   <Route path="/login" component={LoginScreen} />
//   <Route path="*" component={NotFound} />
// </Switch>
// </Router>
