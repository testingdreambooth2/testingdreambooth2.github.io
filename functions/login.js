const axios = require('axios');

exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': 'https://robloxhandeltester.myshopify.com',
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

  try {
    const { code } = JSON.parse(event.body);
    console.log("code ");
    console.log(code);

    const clientId = "1698050749629401147";
    const clientSecret = "RBX-rXDQ2SPCVkCiViwYPZ96yekThmaXWDbYJzWqa1EFcYJeRq8EVqlWhTBSP_bKAkKK";
    const redirectUri = 'https://robloxhandeltester.myshopify.com/callback';

    const data = new URLSearchParams();
    data.append('client_id', clientId);
    data.append('client_secret', clientSecret);
    data.append('grant_type', 'authorization_code');
    data.append('code', code);
    data.append('redirect_uri', redirectUri);

    const tokenResponse = await axios.post('https://apis.roblox.com/oauth/v1/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const accessToken = tokenResponse.data.access_token;

    // Step 2: Use access token for another API call
    const secondData = new URLSearchParams();
    secondData.append('token', accessToken);
    secondData.append('client_id', clientId);
    secondData.append('client_secret', clientSecret);

    const apiResponse = await axios.post('https://apis.roblox.com/oauth/v1/token/resources', secondData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Combine responses into a single object
    const combinedResponse = {
      tokenResponse: tokenResponse.data,
      apiResponse: apiResponse.data,
    };

    // Return combined responses
    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(combinedResponse),
    };
  } catch (error) {
    console.error('Error:', error.response || error.message || error);

    return {
      statusCode: error.response ? error.response.status : 500,
      headers: headers,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
