// functions/getExperienceId.js
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

  if (event.httpMethod === 'OPTIONS') {
    // Respond to preflight request
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://robloxhandeltester.myshopify.com',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: '',
    };
  }

  try {
    const response = await axios.get(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc`, {
      headers: {
        'accept': 'application/json'
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://robloxhandeltester.myshopify.com',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': 'https://robloxhandeltester.myshopify.com',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
