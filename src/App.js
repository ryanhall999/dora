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
import Map from "./Components/Map";
import List from "./Components/List";
import Create from "./Components/Create";

const App = () => {
  console.log(LoginScreen);
  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/create" component={Create} />
          <Route path="/map" component={Map} />
          <Route path="/list" component={List} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
      {/* <Map /> */}
    </div>
  );
};

export default App;
