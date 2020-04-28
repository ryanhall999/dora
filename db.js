const pg = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");

const faker = require("faker");

const client = new pg.Client(
	process.env.DATABASE_URL || "postgres://localhost/acme_db"
);

client.connect();

const getProducts = (amount) => {
	let products = [];
	for (let i = 0; i < amount; i++) {
		let prodName = faker.commerce.productName();
		let type = faker.commerce.department();
		let price = faker.commerce.price(0.99, 20.0, 2);
		let descText = faker.lorem.sentence(5);
		let nameText = faker.lorem.sentence(2);
		let discount = (Math.random() * (0.05 + 0.5)).toFixed(2);
		let img = faker.image.imageUrl(150, 150, "animals", true);
		let url = faker.internet.url();
		let lat = 30 + Math.random();
		let lng = -81 - Math.random();
		let newProd = {
			name: prodName,
			lat: lat,
			lng: lng,
			discount: discount,
			companyName: nameText,
			product: type,
			price: price,
			description: descText,
			image: img,
			url: url,
		};
		products.push(newProd);
	}
	return products;
};

const createMarkers = async ({
	name,
	lat,
	lng,
	discount,
	companyName,
	product,
	price,
	description,
	image,
	url,
}) => {
	const SQL = `INSERT INTO markers(name, lat, lng, discount, price, companyName, product, description, image, url) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`;
	return (
		await client.query(SQL, [
			name,
			lat,
			lng,
			discount,
			price,
			companyName,
			product,
			description,
			image,
			url,
		])
	).rows[0];
};

const sync = async () => {
	const SQL = `
		CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
		DROP TABLE IF EXISTS users;
		DROP TABLE IF EXISTS markers;

		CREATE TABLE users(
			googleID VARCHAR,
			name VARCHAR,
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      username VARCHAR(100) UNIQUE,
      password VARCHAR(100),
			role VARCHAR(20) DEFAULT 'USER',
			status VARCHAR(20) DEFAULT 'ACTIVE'
		);

		CREATE TABLE markers(
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			name VARCHAR(255),
			lat float(20),
			lng float(20),
			discount DECIMAL,
			companyName VARCHAR(255),
			product VARCHAR(255),
			price DECIMAL,
			description VARCHAR(255),
			image VARCHAR(255),
			url VARCHAR(255)
		);
		INSERT INTO markers (name, lat, lng, discount, companyName, product, price, description, url) VALUES ('Ryans House', '30.303055', '-81.468359', '.1', 'RyanCo', 'test', '10.00', 'test', 'https://neoma.org');
		INSERT INTO markers (name, lat, lng, discount, companyName, product, price, description, url) VALUES ('Ryans old House', '30.270565', '-81.464546', '.1', 'RyanCo', 'test', '10.00', 'test', 'https://neoma.org');
		INSERT INTO markers (name, lat, lng, discount, companyName, product, price, description, url) VALUES ('Ryans older House', '30.302785', '-81.566143', '.1', 'RyanCo', 'test', '10.00', 'test', 'https://neoma.org');

	`;
	await client.query(SQL);

	const _products = getProducts(22);
	const _users = [
		{
			googleID: 1,
			name: "bob",
			username: "bob@bob.com",
			password: "BOB",
			role: "ADMIN",
		},
	];

	const [foo, bar, bazz] = await Promise.all(
		Object.values(_products).map((product) => createMarkers(product))
	);

	const [lucy, moe] = await Promise.all(
		Object.values(_users).map((user) =>
			createUserByEmail(
				user.googleID,
				user.username,
				user.name,
				user.password,
				user.role
			)
		)
	);
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

const findUserFromToken = async (token) => {
	const id = jwt.decode(token, process.env.JWT).id;
	const user = (await client.query("SELECT * FROM users WHERE id = $1", [id]))
		.rows[0];
	delete user.password;
	return user;
};

const hash = (password) => {
	console.log(password);
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, 10, (err, hashed) => {
			if (err) {
				return reject(err);
			}
			return resolve(hashed);
		});
	});
};

const compare = ({ plain, hashed }) => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(plain, hashed, (err, verified) => {
			if (err) {
				return reject(err);
			}
			if (verified) {
				return resolve();
			}
			reject(Error("bad credentials"));
		});
	});
};

const authenticate = async ({ userName, password }) => {
	const user = (
		await client.query("SELECT * FROM users WHERE username=$1", [userName])
	).rows[0];
	await compare({ plain: password, hashed: user.password });
	const words = await jwt.encode({ id: user.id }, process.env.JWT);
	return words;
};

const createUserByEmail = async (
	googleID,
	username,
	name,
	password,
	role,
	status
) => {
	const SQL = `INSERT INTO users(googleID, username, name, password, role, status) values($1, $2, $3, $4, $5, $6) returning *`;
	return (
		await client.query(SQL, [
			googleID,
			username,
			name,
			await hash(password),
			role,
			status,
		])
	).rows[0];
};

module.exports = {
	sync,
	createUser,
	createUserByEmail,
	findUser,
	getMarkers,
	addMarker,
	authenticate,
	findUserFromToken,
};
