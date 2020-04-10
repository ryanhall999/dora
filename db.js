const pg = require("pg");
const client = new pg.Client(
	process.env.DATABASE_URL || "postgres://localhost/acme_db"
);

client.connect();

const sync = async () => {
	const SQL = `
		DROP TABLE IF EXISTS users;

		CREATE TABLE users(
			googleID VARCHAR NOT NULL,
			name VARCHAR NOT NULL
		);
	`;
	await client.query(SQL);
};

const createUser = async(id, name) => {
	let sql = `SELECT * FROM users WHERE googleID = $1`
	
	let response = await client.query(sql, [id])
	if(response.rows[0] === undefined) {
		sql = `INSERT INTO users(googleID, name) VALUES($1, $2) returning *`
		response = await client.query(sql, [id, name])
		return response.rows[0]
	}
	
	return response.rows[0]
}

const findUser = async(id) => {
	const sql = `SELECT * FROM users WHERE googleID = $1`
	const response = await client.query(sql, [id])
	return response.rows[0]
}
module.exports = {
	sync,
	createUser,
	findUser
};
