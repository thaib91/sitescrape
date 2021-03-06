// const { SERVER_PORT } = process.env;
const puppeteer = require("puppeteer");
// const ObjectsToCsv = require('objects-to-csv');
const { convertArrayToCSV } = require("convert-array-to-csv");
const converter = require("convert-array-to-csv");

const siteUrl = "https://toronto.iabc.com/about/pic/pic-member-list/";
const header = [
  "name",
  "company",
  "address",
  "location",
  "tel",
  "web",
  "twit",
  "summary"
];
var data;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  await page.goto(siteUrl);

  //getting details of member list
  /* Idea: use regex to break each word be /n in the data file: then throw it into an object or something after that can be coverted into JSON then use JSON -> CSV converter. */

  const siteData = await page.evaluate(() => {
    const pageData = [];
    const emailData = [];
    //get page elements
    const pageElms = document.querySelectorAll(
      "body > div.site-container > div.site-inner > div > main > article > div > div.su-row"
    );
    //parse data from elements
    pageElms.forEach(element => {
      const pageJson = {};
      const emailJson = {};
      try {
        pageJson.data = element.innerText;
        emailJson.data = element.innerHTML;
      } catch (err) {
        console.log(err);
      }
      pageData.push(pageJson);
      //  emailData.push(emailJson)
    });
    return pageData;
    //    return emailData;
  });
  siteData.forEach((el, i) => {
    const splitArr = [];
    splitArr.push(el.data);
    console.log(JSON.stringify(splitArr[0].split("\n")));
  });
  const data = siteData[0].data.split("\n");
  convertArrayToCSV(data, { header, separator: ";" });
//   console.log(csv)
//   console.dir(data, "This is a sample");
})();



