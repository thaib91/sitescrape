const { SERVER_PORT } = process.env;
const puppeteer = require("puppeteer");

const siteUrl = "https://toronto.iabc.com/about/pic/pic-member-list/";

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 926});
    await page.goto(siteUrl);

    //getting details of member list

    const siteData = await page.evaluate(()=>{
        const pageData = [];
        //get page elements
        const pageElms = document.querySelectorAll('body > div.site-container > div.site-inner > div > main > article > div');

        //parse data from elements
        pageElms.forEach((element)=>{
            const pageJson = {};
            try{
                pageJson.name = element.querySelector('body > div.site-container > div.site-inner > div > main > article > div > div:nth-child(5) > div:nth-child(1) > div > strong > a').innerHTML;

            }catch(err){
                console.log(err)
            }
            pageData.push(pageJson)
        }) ;
        return pageData;
    })
    console.dir(siteData)
})();