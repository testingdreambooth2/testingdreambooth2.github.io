// functions/getThumbnails.js
const axios = require('axios');

exports.handler = async function (event, context) {
  // Define CORS headers
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

  try {
    // Extract universe ID from request query parameters
    const universeId = event.queryStringParameters.universeId;

    if (!universeId) {
      return {
        statusCode: 400,
        headers: headers,
        body: JSON.stringify({ error: 'Missing universeId parameter' }),
      };
    }

    const response = await axios.get('https://thumbnails.roblox.com/v1/games/multiget/thumbnails', {
      params: {
        universeIds: universeId, // Use the extracted universe ID here
        countPerUniverse: 1,
        defaults: true,
        size: '768x432',
        format: 'Png',
        isCircular: false
      },
      headers: {
        'accept': 'application/json'
      }
    });

    // Log the whole response
    console.log('Whole response:', response.data);

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
