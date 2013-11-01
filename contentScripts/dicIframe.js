$(function(){
	chrome.runtime.sendMessage({}, function(response) {
		console.log(response);
		$('#dicResult').html(response.dicDom);
	});
});
