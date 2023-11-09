function showDicDialog(dicDom){
  chrome.runtime.sendMessage({ dicDom }, function(response) {
    if('ok' !== response.status){
      console.error('ERROR: chrome.runtime.sendMessage');
    }
  });
  const iframeUrl = chrome.runtime.getURL('contentScripts/dicIframe.html');

  const iframe = document.createElement('iframe');
  iframe.id = 'dicallPanel';
  iframe.src = iframeUrl;
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
