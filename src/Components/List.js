import React, { useState, useEffect, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Axios from "axios";
import "./List.css";
import { ListGroupItem, Card } from "react-bootstrap";

export default function List() {
	const [markers, setMarkers] = useState([]);

	async function getMarkers() {
		const response = await Axios.get("/api/markers");
		const data = response.data;
		setMarkers(data);
		console.log(data);
	}

	function alertClicked() {
		alert("You clicked the ListGroupItem");
	}

	useEffect(() => {
		getMarkers();
	}, []);

	return (
		<div>
			<Card style={{ width: "100%", alignSelf: "center" }}>
				<Card.Header
					style={{ fontWeight: "bold", fontSize: "3rem", alignSelf: "center" }}
				>
					Featured Deals!
				</Card.Header>
				<ListGroup>
					{markers.map((marker) => {
						return (
							<ListGroupItem
								className="ListGroupItem"
								action
								onClick={alertClicked}
								action
								variant="light"
							>
								<div style={{ fontWeight: "bold" }}>{marker.name}</div>
								<div>
									${marker.price}
									{marker.discount} Off
								</div>
								<div>{marker.product}</div>
								<div>
									<a
										href="mailto:email@echoecho.com?subject=SweetWords
&body=Please send me a copy of your new program!"
									>
										Email Me
									</a>
								</div>
							</ListGroupItem>
						);
					})}
				</ListGroup>
			</Card>
		</div>
	);
}
