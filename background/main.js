let responseTextPromise;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    switch(request.cmd) {
      case 'query-dic': {
        responseTextPromise = getApiResponse(request.apiUrl);
        sendResponse({
          cmd: 'query-dic',
          status: 'ok',
          responseText: await responseTextPromise,
        });
        break;
      }
      case 'ask-dic-result': {
        sendResponse({
          cmd: 'ask-dic-result',
          status: 'ok',
          responseText: await responseTextPromise,
        });
        break;
      }
      default:
        throw new Error('Unknown Command', request.cmd);
    }
  })();
  return true;
});

async function getApiResponse(apiUrl) {
  const response = await fetch(apiUrl);
  return response.text();
}

self.addEventListener('fetch', (event) => {
  console.log(event);
});
