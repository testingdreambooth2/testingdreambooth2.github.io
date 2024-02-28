// functions/checkGamePassValue.js
const axios = require('axios');

exports.handler = async function (event, context) {
  // Extracting userId from the query parameters
  const userId = event.queryStringParameters.userId;
  // Extracting valueToBeChecked from the query parameters
  const valueToBeChecked = event.queryStringParameters.valueToBeChecked;

  if (!userId || !valueToBeChecked) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing userId or valueToBeChecked parameter' }),
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

  // Log the userId and valueToBeChecked
  console.log('UserID:', userId);
  console.log('ValueToBeChecked:', valueToBeChecked);

  try {
    // Call the desired API endpoint
    const response = await axios.get(`https://games.roblox.com/v1/games/4633889944/game-passes?sortOrder=Asc&limit=10`);

    // Log the response
    console.log('Response:', response.data);

    // Extract id and price from each element in data
    const extractedData = response.data.data.map(item => ({
      id: item.id,
      price: item.price
    }));

    console.log('Extracted Data:', extractedData);

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(extractedData),
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
