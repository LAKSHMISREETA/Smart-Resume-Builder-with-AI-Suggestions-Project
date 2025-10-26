const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Store resume data in memory (in production use database)
let resumeData = {};

// Save resume endpoint
app.post('/api/save-resume', (req, res) => {
    resumeData = req.body;
    res.json({ success: true, message: 'Resume saved successfully' });
});

// Get resume endpoint
app.get('/api/get-resume', (req, res) => {
    res.json(resumeData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});