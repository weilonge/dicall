function yahooDic(p){
    var api = 'http://tw.dictionary.search.yahoo.com/search?p=' + p;
    $.get(api, function(responseText, textStatus, XMLHttpRequest){
        var dom = $.parseHTML( responseText );
        var dicDom = $('#web > ol > li:first-child', dom);
        console.log(dicDom);
        if( 0 < dicDom.length){
            $('#dicallPanel').html(dicDom);
            $('#dicallPanel').show();
        }
    });
}

function searchDic(selectedStr, e){
    console.log('"' + selectedStr + '" was selected at ' + e.pageX + '/' + e.pageY);
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
        console.log('mouseup');
        if( selection.toString() !== '' ){
            cb(selection.toString(), e);
        }else{
            $('#dicallPanel').hide();
        }
	});
}

$(function(){
    console.log('dicall loaded.');
    selectHelper(searchDic);
    var windowWidth = window.screen.availWidth;
    var windowHeight = window.screen.availHeight;
    $('body').append('\
<style> \
#dicallPanel { \
    font-family: Arial, sans-serif; \
    font-size: 14px; \
    z-index: 10000;\
    position: fixed;\
    width:240px;\
    height: 70%;\
    left: ' + (windowWidth - 260) + 'px;\
    top: 5px;\
    border: 1px solid #ffc940;\
    background: #efefef;\
    color: #333333;\
    overflow:auto;\
} \
#dicallPanel ul {\
    padding-left: 3px;\
}\
#dicallPanel ol {\
    /*padding-left: 3px;*/\
}\
</style> \
<div id="dicallPanel" style=""></div> \
    ');
    $('#dicallPanel').hide();
});
