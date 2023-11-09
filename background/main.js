var dicall = {};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if ( request.dicDom ){
    	dicall.dicDom = request.dicDom;
        sendResponse({status: "ok"});
    }else{
    	sendResponse({dicDom: dicall.dicDom, status: "sent to you"});
    }
});

self.addEventListener('fetch', (event) => {
  console.log(event);
});
