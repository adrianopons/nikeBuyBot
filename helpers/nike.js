const puppeteer = require('puppeteer');

async function iniciarNavegacao() {
    const browser = await puppeteer.launch({
        headless:false,
    });

    const pages = await browser.pages();
    const page = pages[0];
    await page.setViewport({
      width: 1200,
      height: 900,
      deviceScaleFactor: 1,
    });

    return {browser, page};
}

async function encerrarNavegacao(browser, page) {
    await page.close();
    await browser.close();
}

async function efetuarLogin(page, config) {
    await page.goto('https://www.nike.com.br/');

    await page.waitForSelector(`a[id=anchor-acessar-unite-oauth2]`);
    await page.click(`a[id=anchor-acessar-unite-oauth2]`);

    await page.waitForSelector(`input[name=emailAddress]`);
    await page.type(`input[name=emailAddress]`, config.usuario, {delay: 200});
  
    await page.waitForSelector(`input[name=emailAddress]`);
    await page.type(`input[name=password]`, config.senha, {delay: 200});
  
    await page.click(`input[value=ENTRAR]`);
  
    await page.waitForFunction(() =>{
      if (document.querySelector("a[class=minha-conta]") && document.querySelector("a[class=minha-conta]").innerText != "")
          return true;
    }, {timeout: 10000, polling:2000});
  
    const nomeUsuarioLogado = await page.$eval("a[class=minha-conta]", (el) => el.innerText);
    console.log(`Logado como: ${nomeUsuarioLogado}`);
}

async function verificaLogin() {

}

async function adicionarTenis(page, tenis) {
    await page.goto(`https://www.nike.com.br/${tenis.url}`);

    await page.waitForSelector(`button[id=btn-comprar]`);
    await page.screenshot({ path: "tenis.png" });

    await page.waitForSelector(`label[for=tamanho__id${tenis.tamanho}]`);
    await page.click(`label[for=tamanho__id${tenis.tamanho}]`);
    await page.waitForTimeout(2000);

    await page.click(`button[id=btn-comprar]`);

    await page.waitForSelector(`div.ckt__linha-produto`);
    await page.screenshot({ path: "tenisCarrinho.png" });
}

async function irParaCheckout(page) {
    await page.goto(`https://www.nike.com.br/checkout`);
}

async function preencherCheckout() {

}

async function excluirCarrinho() {

}

module.exports = {
    iniciarNavegacao,
    efetuarLogin,
    encerrarNavegacao,
    adicionarTenis,
    irParaCheckout
}