const puppeteer = require('puppeteer');
const { PNG } = require('pngjs');
const ssim = require('ssim.js');
const fs = require('fs');

// Define the threshold
const THRESHOLD = 0.5;

// Path to the reference image
const REFERENCE_IMAGE_PATH = './reference_image_2.png'; // Ensure this image is available in the deployed environment

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*', // Allow all origins
    'Access-Control-Allow-Methods': 'GET, POST', // Allow these methods
    'Access-Control-Allow-Headers': 'Content-Type', // Allow these headers
  };

  // Handle preflight requests for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight request' }),
    };
  }

  // Extract username from query parameters
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
    // Launch Puppeteer and navigate to the Instagram page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Capture a screenshot
    const screenshotBuffer = await page.screenshot();
    await browser.close();

    // Load the reference image
    const referenceImage = PNG.sync.read(fs.readFileSync(REFERENCE_IMAGE_PATH));

    // Load the test image from the screenshot
    const testImage = PNG.sync.read(screenshotBuffer);

    // Ensure both images are the same size
    if (referenceImage.width !== testImage.width || referenceImage.height !== testImage.height) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Images must have the same dimensions.' }),
      };
    }

    // Convert images to grayscale
    function rgbToGray(r, g, b) {
      return 0.2989 * r + 0.5870 * g + 0.1140 * b;
    }

    function imageToGrayscaleData(png) {
      const grayData = new Uint8Array(png.width * png.height);
      for (let i = 0; i < png.data.length; i += 4) {
        grayData[i / 4] = rgbToGray(
          png.data[i],
          png.data[i + 1],
          png.data[i + 2]
        );
      }
      return grayData;
    }

    const grayReference = imageToGrayscaleData(referenceImage);
    const grayTest = imageToGrayscaleData(testImage);

    // Calculate SSIM
    const { ssim: ssimValue } = ssim(grayReference, grayTest, referenceImage.width, referenceImage.height);

    // Determine the response based on SSIM score and threshold
    const userFound = ssimValue >= THRESHOLD;

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
<<<<<<< HEAD
};
=======
};
>>>>>>> 57c74b1569babafe3b44c2434ce08d6be4e47c40
