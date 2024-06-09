// functions/postGamePassDetails.js
const axios = require('axios');
const FormData = require('form-data');

exports.handler = async function (event, context) {
  const userId = event.queryStringParameters.userId;

  if (!userId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing userId parameter' }),
    };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*', 
    'Access-Control-Allow-Methods': 'POST',
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

  console.log('UserID:', userId);

  const formData = new FormData();
  formData.append('IsForSale', 'true');
  formData.append('Price', '19');

  try {
    const response = await axios.post(
      'https://apis.roblox.com/game-passes/v1/game-passes/832599030/details',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          ':authority': 'apis.roblox.com',
          ':method': 'POST',
          ':path': '/game-passes/v1/game-passes/832599030/details',
          ':scheme': 'https',
          'Accept': '*/*',
          'Accept-Encoding': 'gzip, deflate, br, zstd',
          'Accept-Language': 'da-DK,da;q=0.9,en-US;q=0.8,en;q=0.7',
          'Content-Type': 'multipart/form-data',
          'Cookie': 'GuestData=UserID=-1436152080; RBXEventTrackerV2=CreateDate=05/29/2024 11:30:51&rbxid=6084404418&browserid=167836799875; .ROBLOSECURITY=_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_A33DE7D13D20033B44DFBD8E04505BBEABC692693DD36B37322E77CAF121DDAC19686D34F7FC993BDC8AC1488CB29A2D223AFBEE687F521C7418937BD0AA143EA22A8552126AA848B96F835C5F568B29B4C0B54150BBC8BD30DE94702FD97E1B18D85C94167E70FF7F80DF1021AD0E2DDA59C9CCDB9DE421E84DF91DCDB57E45FBCA8F45D9295CC06F2C2A0D8ECBAA6F13F566FD4BBE04457E92BBB7B73FC4E4C2C7D3845ED2834D0A7EA86A7CF93EA414E9233CB85A9874DCFB211F3C057EE52AEDCD82DCE933E2729F6F1BBDC93B1F64ED89D0D081B10918FD25967DB9FEFA628CFFC99F2E6E8A040DF1A520EF8A6D86C467F0A35559350BA2C181BCAB0A2DA178049E9A6D2DD856AB624ACB0DCE11717747D390D43BB634F53FC4A905BCB9CFA9634BCB9C72886A9E0DE06EC47F22EE0223C785CDF28439499D969D435268AE7872BAC3B12E41FC754A9DB1586CB40F82078B8A2652B0064D7DDA1B9BDB05695FAC8E92A88B3E21B6861644BC60D70DE68F9CE247999A509776648D8DBA68D3B0B9E36BE6D8B694A5A35BA74A9BD4D32E19311DFB99F2AD4C760ECDBF15AE8513D7E84924C09732A1F364DFAB3263F35E24849BE2A5005C3DFD1DD1FF6C40024D9D7461811FB5B77A289DFF4CAF5E327858FFEECB728DAC21ACA1A1AC597E9B524D798B8C23C16A908D5F76BE1BD3D8D9C296330C9B5042438FB88572ABE5EDC777486759B789A24000364548CE4D919F746FEDB6A8D9436986A0AE848E42AA4B91B44ADAA8B38167A8746AB7986FA0BB4FA4B14A92C1C54ADE261A0DA913A2CEBF57AB917AB4D123C78F4F0D2F7DDB20CC2A37FDAC674B732EF379307C6C3CEA61B51D2299072BF7F835C40BEEE66CBCE03D1F0BB021036112EE137FD83FFD8392F9EDB5C8D2B4C0EA9BF134FFF3232B78980E0A7465650CDC68BA6138A279C0544D3813B94EC1F7B0E1243C830C0E6F2174FF1DBC70B0AC1F42BF28BAA56811851D0FAA0AEE0375C4BF1A8F97532E9BE021D70C8BC93CAFD62B15F1DAC3A525D2FC6326CEBB7CCC37E1CEB7C62E03BEB74809458787506D8E37647ED889A2C93D8D',
          'Origin': 'https://create.roblox.com',
          'Priority': 'u=1, i',
          'Referer': 'https://create.roblox.com/',
          'Sec-Ch-Ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"Windows"',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
          'X-Csrf-Token': 'B5qo5OUmPuWg'
        }
      }
    );

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
