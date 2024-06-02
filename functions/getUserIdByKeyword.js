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
        'accept': 'application/json',
        'Cookie': '.ROBLOSECURITY=_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_71C687E73A7BFE11B36CC9C96951D2EFEA40F07C02F8DC78714C58D685E5EA1B3C5BF3087FEBF204B19E08BA04BDE7B88151B90E0809AEDA177C0C17C993D19C2D19314FF45FCB418CAA35F54F3A4DF36DC907F549187F99924D7591DB4EFE132A27419B742E922A0D43A02B2DBE9E1323DCE438BC0722D998967E63E54255C64B3AE1B0079641BAD5251982FE4F19970E95BB232561859474ADC28B032578745EA58939FB89262C368B404B8D92361ABADA57C48C085B4449FA3F7CB90B29B435743B6AD4EBC037FD180D62C11DD3D17988B533B329BFFBC2D3D76F7D4C8D6FD66733A351BEA142E20AF0818027C7E7796D80F1A6242E204019F63499E80755F2B14D61EA01B310A7D976888A7E6956F98CB080983E21D3DF71703DBAF471EDDFD09FD44F777A69AEA74DF27D730EAC400B1B56EB700A93F785BBAD5FEB91D88EA6568DC4E6B7E8EA079B90461E843A4A9CC2BCCD680097B6A95B2FE675B0637392D26C8BD18B46FA15B6CBF193521F2E393FB806A9F975B781ED1F93C1183BA2996A1810FE97F4C0874DBAC37B6182212026187D6D5F88E71196DF4CA043C93CB3D49E13753BF37ED05AE7919CF9200FE90475FABA85171AFDCB28D952D6E2074AFFD318583022B139B6FC0E90CB907926D784994A72EE4EE7FE3A2749E4EEB433F117C8F3B835B3412F2C5EAD9A113AD33F7FAC63A1C107BE698966DCC30ACC3531F2A67B874509BAED4C008E852964FFD6CE577C6CCA8AC6D7F16C6BA2114AE06B496A4A75C7541343AACF17E962A3B5D5CDB451EB6526C97CBC0894BAACF75668341F7DDB423548E2F614C14FB6FC3F2C4B31407E812785D7CD1E3E06B08B44B672A12A93926A667E7DF73EF18F3D4ECFD5489711E6C6DE7C8F0E3450BD8F5DE7C484C9F614B683C0F56FE239CDEA805AF22D5B1A034ECE797218A6724ADA28C9A792D82C71FC7EF3A382AC7C47C9949088FC607767B0376219EABE3BD27476D8966114513DBE9BD72728667F3AAD3ABD42DEA95445CAB5126E30115BC4D3A520AC3582A8B9EC4BD438A0893154511DBCA534966676CD0B6A9ED09B9D40769556F8; rbxas=dc83c768ab42ca8015d01d8d5af0ab142954ce70fc974955f9190a5b57ead785; RBXEventTrackerV2=CreateDate=05/29/2024 11:30:51&rbxid=6084404418&browserid=167836799875; _ga_9HRYHVCY79=GS1.1.1717005018.2.0.1717005018.0.0.0; _gid=GA1.2.2048188690.1717317831; RBXSessionTracker=sessionid=7ced9213-32ed-485d-956c-c82985700fb6; rbx-ip2=; _ga=GA1.1.1280795217.1684058914; bm_mi=E09ED80DAB1C7E3BE99F09FDB2574036~YAAQhHymXzfjRsGPAQAAGs+K2BeF028BPZi7Vthd5/QyewUb+mjLAaznN1kS/K9zHtWFVwcU0K7dHLWHTwgj0MsIECIBcLB3Z+Laks9/qe9wCMGaSjob8BzVBhfiljgrPW+lqjgQvaRDFOCxPI4QC4ByvjxrAN5yUI7y5iRPFXQnZ4zwqRlkO4zHf3Plfiv24d0eaQao/rvP5/++LzabeIJy2Q8yRqrdfqduoAODmExmmQwIAldHD2O8oTlDrNjtaxa/c8wVVi5JePaZNzXIAoetO6mwFhg01u5EkDySYXpRI+nL4ToWqXjsSDzrdMb2Otymhdp/MR4xq4ZnrUuejYKYRtP7AanmXuDteiz2/1p9lxXing==~1; UnifiedLoggerSession=CreatorHub%3D%7B%22sessionId%22%3A%223c2de9d9-fc0a-4e65-a9f4-d92abb92b5d4%22%2C%22lastActivity%22%3A1717324919867%7D; _ga_BK4ZY0C59K=GS1.1.1717322408.45.1.1717324921.0.0.0; ak_bmsc=2491DEC3699497045E9F0026300049BC~000000000000000000000000000000~YAAQhHymXw/kRsGPAQAA5SCL2Beakqn4b6Shtjslh4aHDUEAiMYVmiM9CMQP8CzuZoWYyMVIujevNBJWJyVv9K62PJgASv50EgZ3+TKSvYO1EftN6szOYRoi5EmAbm4sC+zUFP53Ugupp5Mh6ef6oY/VfNHZk53OBW1e/Ehg/N0++y7UjQEzfxQLOk/GPr8+XasqjFu5DHxTfQr/SZ/05JA+dfdR07TZ9Ks7RSarrSfHfFPXmW6/21e+16znrm+m4lhXZOSme92kG5drzFe3utwBfRlHAtDu4wf+GmD8gfN2YWfWxA91/Fu8WIc9hXhmvdlWybj7QYqKsNMV9eqYVqEPXaBUR3JFDFY2bJMy7BI/N5sk2peTlzz93B2O40QiJO9rJNJDIVCC70GmXK3BX1seR/jqVeyYsE5+lcAgFND1ZKRn9KDjaFtfeMXJeGrfrikdVY+LuflI14dzVUU39M9jF/utmVwC; bm_sv=6B4F74E7B56A6B23D2E62C05EA19B0C0~YAAQhHymX9fkRsGPAQAA5FaL2BdHG5vf/cGec8JpQ50ymzgAHh4N9HTPYChTbULcZN+GET7hVxg6gZC4H5J7VCAvp1MGaoU4iQlLfxaSpnfnkLmLRnjmcmh9cbpQGGDB276u517CM1HYGnEWbbgVpBwrPKgjAFV4x/FlaIxIMdh5KbG/Pfs0+PO447tioi/nnPNTV8+RSFEtkeB92AQ1uosd2R8ykRI078v7+0OfgtGUYAqLWDm8SyrBEJVx/3dj20Q=~1',

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
