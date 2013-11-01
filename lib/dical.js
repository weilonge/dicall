var Dical = {};
Dical.init = function(show, hide){
    Dical.showDialog = show;
    $(document.body).bind('mouseup', function(e){
        var selection;
        if (window.getSelection) {
            selection = window.getSelection();
        } else if (document.selection) {
            selection = document.selection.createRange();
        }
        if( selection.toString() !== '' ){
            Dical.searchDic(selection.toString(), e);
        }else{
            hide();
        }
    });
}

Dical.yahooDic = function (p){
    var api = 'http://tw.dictionary.search.yahoo.com/search?p=' + p;
    $.get(api, function(responseText, textStatus, XMLHttpRequest){
        var dom = $.parseHTML( responseText );
        var dicDom = $('#web > ol', dom);
        if( 0 < dicDom.length){
            Dical.showDialog(dicDom);
        }
    });
}

Dical.searchDic = function (selectedStr, e){
    Dical.yahooDic(selectedStr);
}
