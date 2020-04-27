import React, { useState, useEffect, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Axios from "axios";
import "./List.css";
import { ListGroupItem, Card, InputGroup, FormControl } from "react-bootstrap";

export default function List() {
	const [markers, setMarkers] = useState([]);

	async function getMarkers() {
		const response = await Axios.get("/api/markers");
		const data = response.data;
		setMarkers(data);
		console.log(data);
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
							<ListGroupItem className="ListGroupItem" action variant="light">
								<div style={{ fontWeight: "bold" }}> {marker.name} </div>
								<div>
									${marker.price} %{(marker.discount * 100).toFixed(2)} Off
								</div>
								<div> {marker.product} </div>
								<div>
									<a
										href={`mailto:?subject=${
											marker.name
										} Discount!&body=Check out this deal! ${marker.name} at % ${
											marker.discount * 100
										} off!`}
									>
										Share this Deal!
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
