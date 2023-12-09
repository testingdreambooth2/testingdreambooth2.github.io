// functions/make-api-request.js
const axios = require('axios');

exports.handler = async function (event, context) {
  try {
    const response = await axios.post('https://users.roblox.com/v1/usernames/users', JSON.parse(event.body));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://robloxhandeltester.myshopify.com',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': 'https://robloxhandeltester.myshopify.com',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
