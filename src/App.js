import React, { useState, useEffect } from "react";
import Map from "./Map";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import axios from "axios";
import Logout from "./Logout";
import LoginScreen from "./LoginScreen";

const App = () => {
	const [user, setUser] = useState({});

	useEffect(() => {
		axios.get("/loggedIn").then((response) => {
			if (response.data.googleid) {
				setUser(response.data);
			}
		});
	}, []);
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/map">Map</Link>
						</li>
					</ul>
				</nav>
				{user.googleid ? <h3>Welcome {user.name}</h3> : null}
				<Switch>
					<Route exact path="/map">
						<div className="mapBox">
							<Map />
						</div>
					</Route>
					<Route exact path="/">
						<LoginScreen user={user} />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
