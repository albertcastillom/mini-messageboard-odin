const {Client} = require("pg");
require("dotenv").config();

const targetUrl = process.argv[2] || process.env.DATABASE_URL;

const client = targetUrl
  ? new Client({ connectionString: targetUrl })
  : new Client({
      host: process.env.PGHOST || 'localhost',
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE || 'mini_messages',
      port: process.env.PGPORT,
  });

  const SQL = `
  DROP TABLE IF EXISTS messages;
  CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    added TIMESTAMP NOT NULL DEFAULT NOW()
  );
  INSERT INTO messages (username, message) VALUES
    ('Amando', 'Hi there!'),
    ('Charles', 'Hello World!');
`;

async function populateDB() {
  try {
    await client.connect();
    console.log(`Connected to database: ${targetUrl}`);
    await client.query(SQL);
    console.log("Database populated with sample data.");
  } catch (err) {
    console.error("Error populating database:", err);
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
}

populateDB();
