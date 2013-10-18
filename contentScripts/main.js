function yahooDic(p){
    var api = 'http://tw.dictionary.search.yahoo.com/search?p=' + p;
    $.get(api, function(responseText, textStatus, XMLHttpRequest){
        var dom = $.parseHTML( responseText );
        var dicDom = $('#web > ol', dom);
        if( 0 < dicDom.length){
            showDicDialog(dicDom);
        }
    });
}

function searchDic(selectedStr, e){
    yahooDic(selectedStr);
}

function selectHelper(cb){
	$(document.body).bind('mouseup', function(e){
        var selection;
        if (window.getSelection) {
	        selection = window.getSelection();
        } else if (document.selection) {
            selection = document.selection.createRange();
        }
        if( selection.toString() !== '' ){
            cb(selection.toString(), e);
        }else{
            hideDicDialog();
        }
	});
}

function showDicDialog(dicDom){
    var dicDomStr = dicDom.clone().wrap('<div/>').parent().html();
    chrome.runtime.sendMessage({dicDom: dicDomStr}, function(response) {
        console.log(response.status);
    });
    if( $('#dicallPanel').length < 1 ){
        $('#dicallWrapper').append('<div id="dicallPanel" style=""></div>');
    }
    var iframeUrl = chrome.extension.getURL("contentScripts/dicIframe.html");
    $('#dicallPanel').html('<div><b>Dical!</b></div><iframe src="' + iframeUrl + '"></iframe>');
}

function hideDicDialog(){
    $('#dicallWrapper').html('');
}

$(function(){
    selectHelper(searchDic);
    $('body').append('<div id="dicallWrapper"><div>');
});
