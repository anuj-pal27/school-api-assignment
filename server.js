require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Database configuration
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // include this if port is not 3306
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
// API to add a school
app.post('/addSchool',async (req, res) => {
    const {name , address,latitude, longitude} = req.body;

    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ error: 'Invalid input data. Name, address, latitude and longitude are required.' });
      }
      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return res.status(400).json({ error: 'Latitude must be between -90 and 90 and longitude between -180 and 180.' });
      }
      try {
        await db.execute(
          'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
          [name, address, latitude, longitude]
        );
        res.status(201).json({ message: 'School added successfully.' });
      } catch (error) {
        res.status(500).json({ error: 'Database error', details: error.message });
      }
    });

    // API to list schools by proximity
app.get('/listSchools', async (req, res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);
  
    // Input validation
    if (isNaN(userLat) || isNaN(userLon)) {
      return res.status(400).json({ error: 'Latitude and longitude query parameters are required and must be numbers.' });
    }
  
    try {
      const [schools] = await db.execute('SELECT * FROM schools');
  
      // Haversine formula to calculate distance
      const toRadians = (deg) => (deg * Math.PI) / 180;
      const haversine = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Earth radius in km
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };
  
      const sortedSchools = schools.map((school) => ({
        ...school,
        distance: haversine(userLat, userLon, school.latitude, school.longitude)
      })).sort((a, b) => a.distance - b.distance);
  
      res.status(200).json(sortedSchools);
    } catch (error) {
      res.status(500).json({ error: 'Database error', details: error.message });
    }
  });

  // Start the server
app.listen(PORT, () => {
    console.log(`School Management API server running on port ${PORT}`);
  });