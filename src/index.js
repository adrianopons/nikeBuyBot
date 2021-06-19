const puppeteer = require('puppeteer');
const config = require(`./config.json`);
const nike = require(`../modulos/nike`);


async function run() {
  try {
    const {browser, page} = await nike.iniciarNavegacao();
    const apagarCarrinho = false;
    const resultadoEfetuarLogin = await nike.efetuarLogin(page, config);
    
    if (!resultadoEfetuarLogin.valido) {
      const resultadoVerificaLogin = await nike.verificaLogin(page);
      if (!resultadoVerificaLogin.valido) {
        console.log(`Erro: ${resultadoVerificaLogin.motivo}`)  ;
      } else {
        const nomeUsuarioLogado = await page.$eval("a[class=minha-conta]", (el) => el.innerText);
        console.log(`Já esta logado como: ${nomeUsuarioLogado}`);

      }
    }


  
    await nike.adicionarTenis(page, config.tenisFake);
  
    await nike.irParaCheckout(page);
  
    await page.waitForTimeout(999999);
  
    await nike.encerrarNavegacao(browser, page);

    
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  await run();
})();