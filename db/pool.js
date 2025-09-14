require("dotenv").config();
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;

const pool = connectionString 
    ? new Pool({ connectionString })
    : new Pool({
        host: process.env.PGHOST || 'localhost',
        user: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        database: process.env.PGDATABASE || 'mini_messages',
        port: process.env.PGPORT,
    });


module.exports = pool;