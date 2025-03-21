require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Store API key in .env

// Endpoint for route optimization
app.post('/optimize-route', async (req, res) => {
    try {
        const { locations } = req.body; // Expecting array of { lat, lng }

        if (!locations || locations.length < 2) {
            return res.status(400).json({ error: "At least two locations are required" });
        }

        console.log("Received locations:", locations); // Log incoming data

        // Construct waypoints for Google API
        const waypoints = locations.slice(1, -1).map(loc => `${loc.lat},${loc.lng}`).join('|');

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${locations[0].lat},${locations[0].lng}&destination=${locations[locations.length - 1].lat},${locations[locations.length - 1].lng}&waypoints=optimize:true|${waypoints}&key=${GOOGLE_MAPS_API_KEY}`;

        console.log("Requesting Google API:", url); // Log API request

        const response = await axios.get(url);

        if (response.data.status !== "OK") {
            console.error("Google API Error:", response.data);
            return res.status(500).json({ error: "Google Maps API failed", details: response.data });
        }

        const optimizedRoute = response.data.routes[0].waypoint_order.map(index => locations[index + 1]);

        res.json({ optimizedRoute });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "Failed to optimize route", details: error.message });
    }
});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
