// functions/login.js
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
    const { code, codeVerifier } = JSON.parse(event.body);
    const clientId = "1698050749629401147";
    const clientSecret = "RBX-rXDQ2SPCVkCiViwYPZ96yekThmaXWDbYJzWqa1EFcYJeRq8EVqlWhTBSP_bKAkKK";
    const redirectUri = 'https://robloxhandeltester.myshopify.com/callback';

    const tokenResponse = await axios.post('https://apis.roblox.com/oauth/token', null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(tokenResponse.data),
    };
  } catch (error) {
    console.error('Error exchanging code:', error);
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
