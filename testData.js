const { Pool } = require('pg');

// Hardcoding the connection just for this test to bypass any .env errors
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hydronode_db',
    password: '0000',
    port: 5432,
});

async function insertFakeData() {
    try {
        // Inserts a fake water level of 75%
        await pool.query('INSERT INTO water_logs (water_percentage) VALUES ($1)', [75]);
        console.log("✅ Fake data (75%) inserted successfully!");
    } catch (error) {
        console.error("❌ Error inserting data:", error.message);
    } finally {
        pool.end(); 
    }
}

insertFakeData();