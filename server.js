const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Predefined valid QR code (the same as the code embedded in the QR)
const validCode = "12345";

// Endpoint to serve the QR authentication page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to serve the secure page (after successful validation)
app.get('/secure-page.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'secure-page.html'));
});

// Endpoint to validate the QR code submitted by the user
app.post('/validate-code', (req, res) => {
    const scannedCode = req.body.code;

    // Compare the scanned code with the valid predefined code
    if (scannedCode === validCode) {
        res.status(200).json({ message: 'Access Granted' });
    } else {
        res.status(403).json({ message: 'Invalid QR Code. Access Denied.' });
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
