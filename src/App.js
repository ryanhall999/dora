import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Login from "./Components/Login";
import Home from "./Components/Home";
import NotFound from "./Components/NotFound";
import LoginScreen from "./Components/LoginScreen";
import Header from "./Components/Header";

const App = () => {
  console.log(LoginScreen);
  return (
    <div>
      <Header />

      <LoginScreen />
    </div>
  );
};

export default App;
