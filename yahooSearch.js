const puppeteer = require('puppeteer');

async function searchYahoo(query) {
  const yahooBrowser = await puppeteer.launch({ headless: "new" });
  const yahooPage = await yahooBrowser.newPage();
  yahooPage.setDefaultNavigationTimeout(60000);
  await yahooPage.goto(`https://search.yahoo.com/search?q=${query}`);

  // Please wait for the search results from Yahoo to load.
  await yahooPage.waitForSelector('#web');

  // Extract the titles and links from the Yahoo search results.
  const yahooResults = await yahooPage.evaluate(() => {
    const resultElements = document.querySelectorAll('.algo');
    const results = [];
    for (let element of resultElements) {
      const titleElement = element.querySelector('h3');
      const linkElement = element.querySelector('a');
      const title = titleElement ? titleElement.innerText : '';
      const link = linkElement ? linkElement.href : '';
      results.push({ title, link });
    }
    return results;
  });

  // await yahooBrowser.close();

  return yahooResults;
}

module.exports = searchYahoo;
