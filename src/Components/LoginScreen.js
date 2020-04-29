import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import Axios from "axios";
import GoogleButton from "react-google-button";
import Create from "./Create";
import { Redirect } from "react-router-dom";

export default function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const headers = () => {
    const token = window.localStorage.getItem("token");
    return {
      headers: {
        authorization: token
      }
    };
  };

  const validateForm = () => {
    return userName && password;
  };

  const handleChange = update => event => {
    update(event.target.value);
  };

  const login = async credentials => {
    const token = (await Axios.post("/api/auth", credentials)).data.token;
    window.localStorage.setItem("token", token);
    exchangeTokenForAuth();
  };

  const exchangeTokenForAuth = async () => {
    const response = await Axios.get("/api/auth", headers());
    console.log(response);
    setAuth(response.data);
    if (response.data.role === "ADMIN") {
      console.log("user is admin");
      setIsAdmin(true);
    }
  };
  console.log(auth);

  const handleSubmit = event => {
    event.preventDefault();
    login({ userName, password }).catch(ex =>
      setError(ex.response.data.message)
    );
  };

  return (
    <div className="login">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" bssize="large">
          <Form.Control
            autoFocus
            type="email"
            value={userName}
            onChange={handleChange(setUserName)}
          />
        </Form.Group>
        <Form.Group controlId="password" bssize="large">
          <Form.Control
            value={password}
            onChange={handleChange(setPassword)}
            type="password"
          />
        </Form.Group>
        <Button block bssize="large" disabled={!validateForm()} type="submit">
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
        <div className="create-Button">
          <Button href="/create" variant="primary" size="lg" block>
            Not a user? Sign up
          </Button>
        </div>
      </Form>
    </div>
  );
}
