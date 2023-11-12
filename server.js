// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/make-api-request', async (req, res) => {
    try {
        const response = await axios.post('https://users.roblox.com/v1/usernames/users', req.body);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
