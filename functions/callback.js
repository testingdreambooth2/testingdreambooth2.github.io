exports.handler = async function (event, context) {
  // Define CORS headers
  const headers = {
    'Access-Control-Allow-Origin': 'https://robloxhandeltester.myshopify.com',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Log the entire received request
  console.log('Received request:', event);

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
    let code;

    // Extract authorization code from different parts of the request
    if (event.httpMethod === 'GET') {
      // Extract from query parameters for GET requests
      code = event.queryStringParameters && event.queryStringParameters.code;
    } else if (event.httpMethod === 'POST') {
      // Extract from request body for POST requests
      const requestBody = JSON.parse(event.body || '{}');
      code = requestBody.code;
    }

    if (!code) {
      console.log('Missing authorization code');
      return {
        statusCode: 400,
        headers: headers,
        body: JSON.stringify({ error: 'Missing authorization code' }),
      };
    }

    console.log('Authorization code:', code);

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: 'Authorization code received' }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
