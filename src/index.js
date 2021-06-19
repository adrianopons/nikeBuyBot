const puppeteer = require('puppeteer');
const config = require(`./config.json`);
const nike = require(`../helpers/nike`);

(async () => {
  const {browser, page} = await nike.iniciarNavegacao();

  await nike.efetuarLogin(page, config);

  await nike.adicionarTenis(page, config.tenisFake);

  await nike.irParaCheckout(page);
  await page.waitForTimeout(999999);

  await nike.encerrarNavegacao(browser, page);
})();