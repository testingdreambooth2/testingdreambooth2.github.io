// functions/getThumbnails.js
const axios = require('axios');

exports.handler = async function (event, context) {
  // Define CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'https://5d133b-53.myshopify.com/',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Respond to preflight request
  if (event.httpMethod === 'OPTIONS') {
    console.log('Preflight request received');
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
      console.log('Missing universeId parameter');
      return {
        statusCode: 400,
        headers: headers,
        body: JSON.stringify({ error: 'Missing universeId parameter' }),
      };
    }

    console.log('Request received for universeId:', universeId);

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
    console.error('Error:', error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server');
      console.error('Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }

    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
