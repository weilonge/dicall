$(function(){
	chrome.runtime.sendMessage({}, function(response) {
		console.log(response);
		$('body').html(response.dicDom);
	});
});
