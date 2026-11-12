require('dotenv').config();
const pool = require('./src/db'); // Adjust this path if your db.js is located somewhere else

async function setupDatabase() {
    const query = `
        CREATE TABLE IF NOT EXISTS water_logs (
            id SERIAL PRIMARY KEY,
            water_percentage INT NOT NULL,
            recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        console.log("Connecting to cloud database...");
        await pool.query(query);
        console.log("water_logs table created successfully!");
    } catch (error) {
        console.error("Error creating table:", error.message);
    } finally {
        pool.end(); 
    }
}

setupDatabase();