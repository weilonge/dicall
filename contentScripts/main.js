function showDicDialog(dicDom){
    var dicDomStr = dicDom.clone().wrap('<div/>').parent().html();
    chrome.runtime.sendMessage({dicDom: dicDomStr}, function(response) {
        if("ok" !== response.status){
            console.log("ERROR: chrome.runtime.sendMessage");
        }
    });
    var iframeUrl = chrome.extension.getURL("contentScripts/dicIframe.html");
    $('#dicallWrapper').html('<iframe id="dicallPanel" src="' + iframeUrl + '" scrolling="no"></iframe>');
}

function hideDicDialog(){
    $('#dicallWrapper').html('');
}

$(function(){
    Dical.init(showDicDialog, hideDicDialog);
    $('body').append('<div id="dicallWrapper"></div>');
});
