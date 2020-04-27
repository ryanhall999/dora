import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Create.css";
import { FormGroup, Form, Button } from "react-bootstrap";

export default function Create() {
	async function handleClick(e) {
		e.preventDefault();
		let email = e.target.form[0].value;
		let password = e.target.form[1].value;
		let newUser = { name: email, password: password };
		await Axios.post("/api/users", newUser).then((response) =>
			console.log(response)
		);
	}

	return (
		<div>
			<Form>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Button
					variant="primary"
					type="submit"
					onClick={(e) => {
						handleClick(e);
					}}
				>
					Submit
				</Button>
			</Form>
		</div>
	);
}
