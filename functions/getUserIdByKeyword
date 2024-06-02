// functions/getUsers.js
const axios = require('axios');

exports.handler = async function (event, context) {
  // Extracting keyword from the query parameters
  const keyword = event.queryStringParameters.keyword;

  if (!keyword) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing keyword parameter' }),
    };
  }

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

  // Log the keyword
  console.log('Keyword:', keyword);

  try {
    const response = await axios.get(`https://users.roblox.com/v1/users/search?keyword=${keyword}&limit=10`, {
      headers: {
        'accept': 'application/json'
      }
    });

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
