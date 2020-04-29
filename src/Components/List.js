import React, { useState, useEffect, useRef } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Axios from "axios";
import "./List.css";
import {
	ListGroupItem,
	Card,
	InputGroup,
	FormControl,
	Table,
} from "react-bootstrap";

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
			<Card
				style={{
					width: "100%",
					alignSelf: "center",
					color: "white",
					backgroundColor: "#3e444a",
				}}
			>
				<Card.Header
					style={{ fontWeight: "bold", fontSize: "3rem", alignSelf: "center" }}
				>
					Featured Deals!
				</Card.Header>
				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>Item</th>
							<th>Deal</th>
							<th>Type</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{markers.map((marker) => {
							return (
								<tr key={marker.id}>
									<td style={{ fontWeight: "bold" }}> {marker.name} </td>
									<td>
										${marker.price} %{(marker.discount * 100).toFixed(2)} Off
									</td>
									<td> {marker.product} </td>
									<td>
										<a
											href={`mailto:?subject=${
												marker.name
											} Discount!&body=Check out this deal! ${
												marker.name
											} at % ${marker.discount * 100} off!`}
										>
											Share this Deal!
										</a>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</Card>
		</div>
	);
}
