async function showDicDialog({ responseTextPromise }) {
  appendResult({ responseText: await responseTextPromise });
}

function appendResult({ responseText }) {
  const dom = document.createElement('div');
  dom.innerHTML = responseText;
  const dicDom = dom.querySelector('#web > ol');
  const dicResult = document.getElementById('dicResult');
  dicResult.innerHTML = '';
  dicResult.appendChild(dicDom);
  dicResult.scrollTop = 0;
}

function hideDicDialog() {
}

async function main() {
  await waitForLoad();

  const response = await chrome.runtime.sendMessage({ cmd: 'ask-dic-result' });
  appendResult(response);

  Dical.create(showDicDialog, hideDicDialog);
}
main();
