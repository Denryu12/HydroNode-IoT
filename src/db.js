const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hydronode_db',
    password: '0000',
    port: 5432,
});

pool.on('connect', () => {
    console.log('Connected to local PostgreSQL database!');
});

pool.on('error', (err) => {
    console.error('Unexpected database error:', err.message);
});

module.exports = pool;