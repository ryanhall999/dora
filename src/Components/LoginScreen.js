import React from "react";
import Button from "react-bootstrap/Button";
import Login from "./Login";
import Logout from "./Logout";

export default function LoginScreen({ user }) {
  return (
    <div>
      <Button variant="primary">
        {user.googleid ? <Logout /> : <Login />}
      </Button>
    </div>
  );
}
