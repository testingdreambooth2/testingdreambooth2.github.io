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

  // Define CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'https://xn--kbrbx-vua.dk',
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

  try {
    const response = await axios.get(`https://games.roblox.com/v2/users/${userId}/games?accessFilter=2&limit=50&sortOrder=Asc`, {
      headers: {
        'accept': 'application/json'
      }
    });

    // Log the whole response
    console.log('Whole response:', response.data);

    // Extracting ID and name from the response data
    const experienceData = response.data.data.map(item => ({
      id: item.id,
      name: item.name
    }));

    console.log('Extracted experience data:', experienceData);

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ experienceData: experienceData }),
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
