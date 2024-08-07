const puppeteer = require('puppeteer-core'); // Use puppeteer-core for more control over Chromium
const { PNG } = require('pngjs'); // For PNG image handling
const ssim = require('ssim.js'); // For SSIM comparison
const fs = require('fs');
const path = require('path');

// Define the threshold for similarity score
const THRESHOLD = 0.5;
const REFERENCE_IMAGE_PATH = path.resolve(__dirname, '../reference_image_2.png');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight request' }),
    };
  }

  const username = event.queryStringParameters.username;

  if (!username) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Username is required.' }),
    };
  }

  const url = `https://www.instagram.com/${username}?hl=en`;

  try {
    // Launch Puppeteer and take a screenshot
    const browser = await puppeteer.launch({
      executablePath: process.env.CHROME_BIN || '/usr/bin/chromium-browser', // Adjust this path as needed
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const screenshotBuffer = await page.screenshot();
    await browser.close();

    // Convert screenshot to PNG
    const screenshotPng = PNG.sync.read(screenshotBuffer);

    // Load reference image
    const referenceImageBuffer = fs.readFileSync(REFERENCE_IMAGE_PATH);
    const referencePng = PNG.sync.read(referenceImageBuffer);

    // Ensure both images have the same dimensions
    if (referencePng.width !== screenshotPng.width || referencePng.height !== screenshotPng.height) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Images must have the same dimensions.' }),
      };
    }

    // Calculate SSIM
    const { ssim } = ssim({ data: referencePng.data, width: referencePng.width, height: referencePng.height }, { data: screenshotPng.data, width: screenshotPng.width, height: screenshotPng.height });

    // Check against the threshold
    const userFound = ssim >= THRESHOLD;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ userFound }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
