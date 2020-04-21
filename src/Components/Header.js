import React from "react";
import { Navbar, Form } from "react-bootstrap";
import { Nav, FormControl, Button } from "react-bootstrap";
import Login from "./Login";
import Logout from "./Logout";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">HeadCount Discount</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  );
}
