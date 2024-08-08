const puppeteer = require("puppeteer");

(async () => {
    // set headless at true for see the browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1680, height: 920 });
    await page.goto("https://subscribe.free.fr/login/do_login.pl?link=freeproxi");

    // Fill login form
    await page.type('input[name="login"]', 'coucou'); // Set your username
    await page.type('input[name="pass"]', 'coucou'); // Set your password

    // send form
    await page.click('input[type="submit"]');

    // wait loading page
    await page.waitForNavigation();

    // wait loading button
    await page.waitForSelector('button.freeproxy-home-button');

    //wait 5s
    await new Promise(resolve => setTimeout(resolve, 5000));

    // click on button
    await page.click('button.freeproxy-home-button');

    // wait loading modal
    await page.waitForSelector('textarea[placeholder="Écrivez votre réponse"]');

    //fill textarea
    await page.type('textarea[placeholder="Écrivez votre réponse"]', "Tout refonctionne merci, mais j'attends un dédommagement...");

    // wait loading button
    await page.waitForSelector('div.w-full.absolute.bottom-0.left-0 button.freeproxy-home-button');

    // Cclick on button next
    await page.click('div.w-full.absolute.bottom-0.left-0 button.freeproxy-home-button');

    //wait 5s
    await new Promise(resolve => setTimeout(resolve, 5000));

    //Take screenshot
    await page.screenshot({ path: "example.png" });

    await browser.close();

})();