require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./src/db'); 

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(`public`));

// Test Route
app.get('/', (req, res) => {
    res.send('HydroNode IoT Backend is running!');
});

// API Route to fetch the latest water levels for your dashboard
app.get('/api/water-level', async (req, res) => {
    try {
        // Gets the 10 most recent readings
        const result = await pool.query('SELECT * FROM water_logs ORDER BY recorded_at DESC LIMIT 10');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});