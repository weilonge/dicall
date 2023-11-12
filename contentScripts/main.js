async function showDicDialog({ responseTextPromise }){
  const iframe = document.createElement('iframe');
  iframe.id = 'dicallPanel';
  iframe.src = chrome.runtime.getURL('contentScripts/dicIframe.html');
  iframe.scrolling = 'no';
  document.getElementById('dicallWrapper').appendChild(iframe);
  await responseTextPromise;
}

function hideDicDialog(){
  document.getElementById('dicallWrapper').innerHTML = '';
}

async function main() {
  await waitForLoad();

  const dicallWrapper = document.createElement('div');
  dicallWrapper.id = 'dicallWrapper';
  document.body.appendChild(dicallWrapper);

  Dical.create(showDicDialog, hideDicDialog);

}
main();
