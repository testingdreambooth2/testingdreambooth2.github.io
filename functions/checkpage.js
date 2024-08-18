// netlify/functions/checkPage.js
const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');

exports.handler = async function(event, context) {
  const { username } = JSON.parse(event.body);

  if (!username) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Username is required' }),
    };
  }

  const url = `https://www.instagram.com/${username}/?hl=en`;

  let browser;
  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    const bodyText = await page.evaluate(() => document.body.innerText);

    const isPageAvailable = !bodyText.includes("Sorry, this page isn't available.");
    const message = isPageAvailable ? 'The page is available.' : 'The page is not available.';

    return {
      statusCode: 200,
      body: JSON.stringify({ page_available: isPageAvailable, message }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
