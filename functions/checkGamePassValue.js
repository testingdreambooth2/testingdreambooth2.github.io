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
    const extractedData = response.data.data;

    // Check if any price matches the valueToBeChecked
    let foundId = false;
    for (let i = 0; i < extractedData.length; i++) {
      console.log(`Checking price ${extractedData[i].price}...`);
      if (extractedData[i].price === valueToBeChecked) {
        foundId = extractedData[i].id;
        break; // Exit the loop if a match is found
      }
    }

    if (foundId) {
      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({ id: foundId }),
      };
    } else {
      return {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify({ message: 'No game pass found with the specified price' }),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};