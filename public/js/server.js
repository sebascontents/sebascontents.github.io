const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const filePath = path.join(__dirname, 'data', 'subscribers.json');

app.get('/api/subscribers', (req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading subscribers file' });
        }
        const subscribers = JSON.parse(data);
        res.json(subscribers);
    });
});

app.post('/api/subscribers', (req, res) => {
    const { subscriberCount } = req.body;
    fs.writeFile(filePath, JSON.stringify({ subscriberCount }), (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error writing subscribers file' });
        }
        res.status(200).json({ message: 'Subscriber count updated' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});