const pg = require("pg");
const client = new pg.Client(
	process.env.DATABASE_URL || "postgres://localhost/acme_db"
);

client.connect();

const sync = async () => {
	const SQL = `
		CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
		DROP TABLE IF EXISTS users;
		DROP TABLE IF EXISTS markers;

		CREATE TABLE users(
			googleID VARCHAR NOT NULL,
			name VARCHAR NOT NULL
		);

		CREATE TABLE markers(
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			name VARCHAR(255),
			lat float(20),
			lng float(20)
		);

		INSERT INTO markers (name, lat, lng) VALUES ('Ryans House', '30.303055', '-81.468359');
		INSERT INTO markers (name, lat, lng) VALUES ('Ryans old House', '30.270565', '-81.464546');
		INSERT INTO markers (name, lat, lng) VALUES ('Ryans older House', '30.302785', '-81.566143');

	`;
	await client.query(SQL);
};

const createUser = async (id, name) => {
	let sql = `SELECT * FROM users WHERE googleID = $1`;

	let response = await client.query(sql, [id]);
	if (response.rows[0] === undefined) {
		sql = `INSERT INTO users(googleID, name) VALUES($1, $2) returning *`;
		response = await client.query(sql, [id, name]);
		return response.rows[0];
	}

	return response.rows[0];
};

const findUser = async (id) => {
	const sql = `SELECT * FROM users WHERE googleID = $1`;
	const response = await client.query(sql, [id]);
	return response.rows[0];
};

const getMarkers = async () => {
	const sql = `SELECT * FROM markers`;
	const response = await client.query(sql);
	return response.rows;
};

const addMarker = async (marker) => {
	const SQL =
		"INSERT INTO markers(name, lat, lng) values($1, $2, $3) returning *";
	return (await client.query(SQL, [marker.name, marker.lat, marker.lon]))
		.rows[0];
};

module.exports = {
	sync,
	createUser,
	findUser,
	getMarkers,
	addMarker,
};
