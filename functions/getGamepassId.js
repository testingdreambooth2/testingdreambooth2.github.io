// functions/getGamePasses.js
const axios = require('axios');

exports.handler = async function (event, context) {
  // Extracting userId from the query parameters
  const userId = event.queryStringParameters.userId;

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing userId parameter' }),
    };
  }

   // Define CORS headers https://rbxhandeltest.myshopify.com
  // Original 'Access-Control-Allow-Origin': 'https://robloxhandeltester.myshopify.com', 
  // Test-side 'Access-Control-Allow-Origin': 'https://rbxhandeltest.myshopify.com', 
  const headers = {
    'Access-Control-Allow-Origin': 'https://robloxhandeltester.myshopify.com', 
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Respond to preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: headers,
      body: '',
    };
  }

  // Log the userId
  console.log('UserID:', userId);

  try {
    const response = await axios.get(`https://games.roblox.com/v1/games/4633889944/game-passes?sortOrder=Asc&limit=10`);

    // Log the response
    console.log('Response:', response.data);

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
