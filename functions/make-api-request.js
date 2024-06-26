// functions/make-api-request.js
const axios = require('axios');

exports.handler = async function (event, context) {
  if (event.httpMethod === 'OPTIONS') {
    // Respond to preflight request
    return {
      statusCode: 200,
      headers: {
         // Define CORS headers https://rbxhandeltest.myshopify.com
  // Original 'Access-Control-Allow-Origin': 'https://robloxhandeltester.myshopify.com', 
  // Test-side 'Access-Control-Allow-Origin': 'https://rbxhandeltest.myshopify.com',
        //        'Access-Control-Allow-Origin': 'https://xn--kbrbx-vua.dk',  

        'Access-Control-Allow-Origin': 'https://xn--kbrbx-vua.dk',  
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: '',
    };
  }

  try {
console.log("Request Body:", JSON.parse(event.body));
    const response = await axios.post('https://users.roblox.com/v1/usernames/users', JSON.parse(event.body));

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://xn--kbrbx-vua.dk', 
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': 'https://xn--kbrbx-vua.dk', 
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
