let responseText;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    switch(request.cmd) {
      case 'query-dic': {
        const response = await fetch(request.apiUrl);
        responseText = await response.text();
        sendResponse({
          cmd: 'query-dic',
          status: 'ok',
          responseText,
        });
        break;
      }
      case 'ask-dic-result': {
        sendResponse({
          cmd: 'ask-dic-result',
          status: 'ok',
          responseText,
        });
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
