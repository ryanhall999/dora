import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import GoogleButton from "react-google-button";
import { Redirect } from "react-router-dom";

export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    return userName && password;
  };

  const handleChange = update => event => {
    update(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(userName, password);
  };

  return (
    <div className="login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" bsSize="large">
          <Form.Control
            autoFocus
            type="email"
            value={userName}
            onChange={handleChange(setUserName)}
          />
        </Form.Group>
        <Form.Group controlId="password" bsSize="large">
          <Form.Control
            value={password}
            onChange={handleChange(setPassword)}
            type="password"
          />
        </Form.Group>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
        <div className="google-button">
          <GoogleButton
            onClick={() => {
              console.log("Google button clicked");
              window.location = "/google";
            }}
          />
        </div>
      </Form>
    </div>
  );
}
