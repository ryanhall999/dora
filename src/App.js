import React, { useState, useEffect } from "react";
import Map from "./Map";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Login from "./Login";
import axios from 'axios'

const App = () => {
	const [user, setUser] = useState({})

	useEffect(() => {
		axios.get('/loggedIn')
		.then(response => {
			if(response.data.googleid) {
				setUser(response.data)
			}
		})
	}, [])
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Map</Link>
						</li>
						<li>
							<Link to="/login">Login</Link>
						</li>
					</ul>
				</nav>
				{
					user.googleid ? <h3>Welcome {user.name}</h3> : null
				}

				<Switch>
					<Route exact path="/">
						<div className="mapBox">
							<Map />
						</div>
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>

				</Switch>
			</div>
			
		</Router>
	);
};

export default App;
