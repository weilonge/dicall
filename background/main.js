const dicall = {};
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  (async () => {
    switch(request.cmd) {
      case 'query-dic': {
        const response = await fetch(request.apiUrl);
        const responseText = await response.text();
        dicall.dicDom = responseText;
        sendResponse({status: 'ok', cmd: 'query-dic'});
        break;
      }
      case 'ask-dic-result': {
        sendResponse({dicDom: dicall.dicDom, status: 'ok', cmd: 'ask-dic-result'});
        break;
      }
      default:
        throw new Error('Unknown Command', request.cmd);
    }
  })();
  return true;
});

self.addEventListener('fetch', (event) => {
  console.log(event);
});
