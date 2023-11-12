async function showDicDialog({ apiUrl }) {
  console.log(apiUrl);
  const response = await chrome.runtime.sendMessage({ cmd: 'query-dic', apiUrl });
  if('ok' !== response.status){
    console.error(`query-dic can not be sent successfully`);
    return;
  }
  askDicResult();
}

function hideDicDialog() {
}

async function main() {
  askDicResult();
  await Dical.create(showDicDialog, hideDicDialog);
}
main();

function askDicResult() {
  return chrome.runtime.sendMessage({ cmd: 'ask-dic-result' }, function(responseText) {
    const dom = document.createElement('div');
    dom.innerHTML = responseText.dicDom;
    const dicDom = dom.querySelector('#web > ol');
    const dicResult = document.getElementById('dicResult');
    dicResult.innerHTML = dicDom.innerHTML;
    dicResult.scrollTop = 0;
  });
}
