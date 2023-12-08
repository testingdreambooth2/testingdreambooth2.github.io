// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/make-api-request', async (req, res) => {
    try {
        // Extract usernames and excludeBannedUsers from the request body
        const { usernames, excludeBannedUsers } = req.body;

        // Make the API request with the extracted data
        console.log(req);
        const response = await axios.post('https://users.roblox.com/v1/usernames/users', {
            usernames: usernames,
            excludeBannedUsers: excludeBannedUsers
        });

        // Send the API response back to the client
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
