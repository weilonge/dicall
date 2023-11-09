function showDicDialog(dicDom) {
  const dicResult = document.getElementById('dicResult');
  dicResult.innerHTML = dicDom;
  // scrollTop(0);
}

function hideDicDialog() {
}

async function main() {
  chrome.runtime.sendMessage({}, function(response) {
    const dicResult = document.getElementById('dicResult');
    dicResult.innerHTML = response.dicDom;
  });

  await Dical.create(showDicDialog, hideDicDialog);
}
main();
