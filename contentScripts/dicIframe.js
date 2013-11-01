function showDicDialog(dicDom){
    $('#dicResult').html(dicDom).scrollTop(0);
}

function hideDicDialog(){
}

$(function(){
	chrome.runtime.sendMessage({}, function(response) {
		console.log(response);
		$('#dicResult').html(response.dicDom);
	});
    Dical.init(showDicDialog, hideDicDialog);
});
