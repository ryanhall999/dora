import React from "react";
import { Button } from "react-bootstrap";

const Logout = () => {
  return (
    <div>
      <a href="/logout">
        <Button variant="danger">Logout</Button>
      </a>
    </div>
  );
};

export default Logout;
