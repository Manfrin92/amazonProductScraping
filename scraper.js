const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.goto(url);

  const [imageElement] = await page.$x('//*[@id="ebooksImgBlkFront"]');
  const imageSrc = await imageElement.getProperty("src");
  const imageSrcTxt = await imageSrc.jsonValue();

  const [titleElement] = await page.$x('//*[@id="productTitle"]');
  const titleSrc = await titleElement.getProperty("textContent");
  const rawTitle = await titleSrc.jsonValue();

  const [priceElement] = await page.$x('//*[@id="kindle-price"]');
  const priceSrc = await priceElement.getProperty("textContent");
  const rawPrice = await priceSrc.jsonValue();

  console.log("book photo: ", imageSrcTxt);
  console.log("title: ", rawTitle);
  console.log("price: ", rawPrice);

  browser.close();
}

scrapeProduct(
  "https://www.amazon.com.br/Respire-uma-vida-em-movimento-ebook/dp/B09CN37ZW2/ref=sr_1_3?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3CL49MFJ2FMEO&keywords=gracie&qid=1641752232&sprefix=grac%2Caps%2C194&sr=8-3"
);
