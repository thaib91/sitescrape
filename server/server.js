const { SERVER_PORT } = process.env;
const puppeteer = require("puppeteer");

const siteUrl = "https://toronto.iabc.com/about/pic/pic-member-list/";

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 926});
    await page.goto(siteUrl);
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






    //getting details of member list

    const siteData = await page.evaluate(()=>{
        const pageData = [];
        //get page elements
        const pageElms = document.querySelectorAll('body > div.site-container > div.site-inner > div > main > article');

        //parse data from elements
       const scraper = pageElms.forEach((element)=>{
            let num = 3;
            let nextPerson = num += 2
            const pageJson = {};
            try{ 
                if(nextPerson > 50){
                    return pageData
                }
                pageJson.name = element.querySelector(`body > div.site-container > div.site-inner > div > main > article > div > div:nth-child(${nextPerson}) > div:nth-child(1) > div`).innerText;
                
                scraper()

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

//**********Try adding an if statement that conditions when to stop or continue */

//body > div.site-container > div.site-inner > div > main > article > div > div:nth-child(5) > div:nth-child(1) > div
//body > div.site-container > div.site-inner > div > main > article > div > div:nth-child(7) > div:nth-child(1) > div
//body > div.site-container > div.site-inner > div > main > article > div > div:nth-child(9) > div:nth-child(1) > div
