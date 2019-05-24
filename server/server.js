const { SERVER_PORT } = process.env;
const puppeteer = require("puppeteer");

const siteUrl = "https://toronto.iabc.com/about/pic/pic-member-list/";

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 926});
    await page.goto(siteUrl);
    await page.waitForSelector("body > div.site-container > div.site-inner > div > main > article > div")

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


















    //getting details of member list

    const siteData = await page.evaluate(()=>{
        const pageData = [];
        //get page elements
        const pageElms = document.querySelectorAll('body > div.site-container > div.site-inner > div > main > article');

        //parse data from elements
        pageElms.forEach((element)=>{
            const pageJson = {};
            try{
                pageJson.name = element.querySelectorAll('div .su-row').innerText;


            }catch(err){
                console.log(err)
            }
            pageData.push(pageJson)
            console.log(pageData)
        }) ;
        return pageData;
    })
    console.dir(siteData)

})();