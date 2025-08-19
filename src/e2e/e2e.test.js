import puppetteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(20000); // default puppeteer timeout

describe("popover test", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:8080";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    // await new Promise((resolve, reject) => {
    //   server.on("error", reject);
    //   server.on("message", (message) => {
    //     if (message === "ok") {
    //       resolve();
    //     }
    //   });
    // });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  describe("popover reveal", () => {
    beforeEach(async () => {
      await page.goto(baseUrl);
    });

    test("reveal popover on first click", async () => {
      const btn = await page.$(".btn");
      await btn.click();

      await page.waitForSelector(".popover");
    });

    test("remove popover on second click", async () => {
      const btn = await page.$(".btn");
      await btn.click();
      await page.waitForSelector(".popover");
      await btn.click();
      const popover = await page.$(".popover");
      (await popover) === null;
    });
  });
});
