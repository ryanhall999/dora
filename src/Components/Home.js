import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import "./Home.css";

export default function Home() {
	const [user, setUser] = useState({});

	useEffect(() => {
		axios.get("/loggedIn").then((response) => {
			console.log(response);
			if (response.data.googleid) {
				setUser(response.data);
			}
		});
	}, []);

	return (
		<div>
			<Card className="bg-dark text-white">
				<Card.Img
					src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-1.2.1&w=1000&q=80"
					alt="Card image"
					class="background"
				/>
				<Card.ImgOverlay>
					<Card.Title>
						{user.googleid ? <h3>Hello {user.name}</h3> : null}
					</Card.Title>
					<div>
						<Card.Text>
							Welcome to Bargain Without the Arguing, the fun and easy to use
							app that allows you to find local deals and discounts for numerous
							shops, restaruants and recreational activities.
						</Card.Text>
					</div>
				</Card.ImgOverlay>
			</Card>
		</div>
	);
}
//  <div> {user.googleid ? <h3>Welcome {user.name}</h3> : null}</div>;
