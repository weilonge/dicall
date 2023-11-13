async function showDicDialog({ responseTextPromise }) {
  const contentLoader = document.getElementById('contentLoader');
  contentLoader.classList.remove('hidden');
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
  contentLoader.classList.add('hidden');
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
