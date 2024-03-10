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

  // Define CORS headers https://rbxhandeltest.myshopify.com
  // Original 'Access-Control-Allow-Origin': 'https://robloxhandeltester.myshopify.com', 
  // Test-side 'Access-Control-Allow-Origin': 'https://rbxhandeltest.myshopify.com', 
  const headers = {
    'https://robloxhandeltester.myshopify.com',
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
    let foundId = null;
    let priceFound = false;

    for (let i = 0; i < extractedData.length; i++) {
      console.log(`Checking price ${extractedData[i].price}...`);

      // Convert both values to the same data type before comparison
      if (Number(extractedData[i].price) === Number(valueToBeChecked)) {
        foundId = extractedData[i].id;
        priceFound = true;
        console.log(`Price ${extractedData[i].price} matches ${valueToBeChecked}`);
        break; // Exit the loop if a match is found
      } else {
        // Update foundId with the last ID in the loop
        foundId = extractedData[i].id;
      }
    }

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ id: foundId, priceFound: priceFound }),
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
