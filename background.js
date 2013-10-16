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
    $('body').append('<div id="dicallPanel" style=""></div>');
    $('#dicallPanel').
        css('left', windowWidth - 360).
        css('top', windowHeight - 320).
        hide();
});
