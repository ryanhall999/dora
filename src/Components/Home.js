import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("/loggedIn").then(response => {
      if (response.data.googleid) {
        setUser(response.data);
      }
    });
  }, []);
  return <div> {user.googleid ? <h3>Welcome {user.name}</h3> : null}</div>;
}
