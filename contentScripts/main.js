async function showDicDialog({ apiUrl }){
  const response = await chrome.runtime.sendMessage({ cmd: 'query-dic', apiUrl });
  if('ok' !== response.status){
    console.error(`query-dic can not be sent successfully`);
    return;
  }
  const iframe = document.createElement('iframe');
  iframe.id = 'dicallPanel';
  iframe.src = chrome.runtime.getURL('contentScripts/dicIframe.html');
  iframe.scrolling = 'no';
  document.getElementById('dicallWrapper').appendChild(iframe);
}

function hideDicDialog(){
  document.getElementById('dicallWrapper').innerHTML = '';
}

async function main() {
  await Dical.create(showDicDialog, hideDicDialog);

  const dicallWrapper = document.createElement('div');
  dicallWrapper.id = 'dicallWrapper';
  document.body.appendChild(dicallWrapper);
}
main();
