function yahooDic(p){
    var api = 'http://tw.dictionary.search.yahoo.com/search?p=' + p;
    $.get(api, function(responseText, textStatus, XMLHttpRequest){
        var dom = $.parseHTML( responseText );
        var dicDom = $('#web > ol', dom);
        console.log(dicDom);
        if( 0 < dicDom.length){
            showDicDialog(dicDom);
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
            hideDicDialog();
        }
	});
}

function showDicDialog(dicDom){
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    $('#dicallWrapper').append('<div id="dicallPanel" style=""></div>');
    $('#dicallPanel').html(dicDom);
    $('#dicallPanel').
        css('left', windowWidth - 345).
        css('top', windowHeight - 205);
}

function hideDicDialog(){
    $('#dicallWrapper').html('');
}

$(function(){
    console.log('dicall loaded.');
    selectHelper(searchDic);
    $('body').append('<div id="dicallWrapper"><div>');
});
