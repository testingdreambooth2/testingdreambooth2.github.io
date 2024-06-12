exports.handler = async function (event, context) {
  // Define CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
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
    // Extract authorization code from query parameters
    const code = event.queryStringParameters.code;

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
