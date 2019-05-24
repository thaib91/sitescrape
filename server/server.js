const { SERVER_PORT } = process.env;
const puppeteer = require("puppeteer");
const ObjectsToCsv = require('objects-to-csv');

const siteUrl = "https://toronto.iabc.com/about/pic/pic-member-list/";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  await page.goto(siteUrl);

  //getting details of member list

  const siteData = await page.evaluate(() => {
    const pageData = [];
    //get page elements
    const pageElms = document.querySelectorAll(
        "body > div.site-container > div.site-inner > div > main > article > div > div.su-row"
      );
    let num = 3;

    //parse data from elements
    const scraper = pageElms.forEach(element => {
      let nextPerson = (num += 2);
      const pageJson = {};
      try {
        if (nextPerson > 50) {
          return pageData;
        }
        pageJson.data = element.innerText;

        scraper();
      } catch (err) {
        console.log(err);
      }
      pageData.push(pageJson);
      console.log(pageData);
    });
    return pageData;
  });
  console.dir(siteData);
})();

(async() => {
    let csv = new ObjectsToCsv(siteData);
    await csv.toDisk('./test.csv');
    console.log(await csv.toString());
})();


//**********Try adding an if statement that conditions when to stop or continue ****************/

//body > div.site-container > div.site-inner > div > main > article > div > div:nth-child(5) > div:nth-child(1) > div
//body > div.site-container > div.site-inner > div > main > article > div > div:nth-child(7) > div:nth-child(1) > div
//body > div.site-container > div.site-inner > div > main > article > div > div:nth-child(9) > div:nth-child(1) > div

// await page.waitForSelector("body > div.site-container > div.site-inner > div > main > article > div")

// const siteData = await page.evaluate(()=>{
//     const dataNodeList = document.querySelectorAll('body > div.site-container > div.site-inner > div > main > article > div')
//     const nameList = document.querySelectorAll('div.su-column-inner.su-clearfix > strong > a')
//     const pageData = [];

//     for (let i = 0; i < dataNodeList.length; i++){
//         pageData[i] = {
//             name: nameList[i].innerText
//         }
//     }
//     console.log(pageData)
// });
