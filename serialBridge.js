const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const pool = require('./src/db');

// Note: 'COM3' will need to be updated to your Arduino's port later
const port = new SerialPort({ path: 'COM3', baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

console.log("Listening for Arduino data on COM3...");

parser.on('data', async (data) => {
    try {
        const sensorData = JSON.parse(data);
        console.log(`Received Water Level: ${sensorData.level}%`);

        // Insert the data into PostgreSQL
        await pool.query(
            'INSERT INTO water_logs (water_percentage) VALUES ($1)',
            [sensorData.level]
        );
    } catch (error) {
        console.error("Error processing Arduino data:", error.message);
    }
});