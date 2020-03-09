const pg = require('pg');
const client = new pg.Client(
  process.env.DATABASE_URL || 'postgres://localhost/year_in_pixels_db'
);

client.connect();

const sync = async () => {
  const SQL = `

`;
  await client.query(SQL);
};

module.exports = {
  sync,
};
