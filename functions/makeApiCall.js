const axios = require('axios');

exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': 'https://xn--kbrbx-vua.dk',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: headers,
      body: '',
    };
  }

  const {
    accessToken,
    privateServerPriceRobux
  } = JSON.parse(event.body);

  const bodyData = JSON.stringify({
    privateServerPriceRobux
  });

  const apiUrl = 'https://apis.roblox.com/cloud/v2/universes/6047921702';

  try {
    const response = await axios.patch(apiUrl, bodyData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Error making API call:', error);
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
