class Dical {
  static create(show, hide) {
    const dical = new Dical();
    dical.init(show, hide);
  }

  init(show, hide) {
    document.addEventListener('mouseup', async () => {
      const selection = this.getSelection();
      if( selection !== '' ){
        const responseText = await this.searchDic(selection);
        show({ responseText });
      }else{
        hide();
      }
    });
  }

  getSelection() {
    let selection;
    if (window.getSelection) {
      selection = window.getSelection();
    } else if (document.selection) {
      selection = document.selection.createRange();
    }
    return selection.toString().trim();
  }

  async searchDic(selectedStr) {
    const apiUrl = 'https://tw.dictionary.search.yahoo.com/search?p=' + selectedStr;
    const response = await chrome.runtime.sendMessage({ cmd: 'query-dic', apiUrl });
    if('ok' !== response.status){
      console.error(`query-dic can not be sent successfully`);
      return;
    }
    return response.responseText;
  }
}

async function waitForLoad() {
  if (document.readyState !== 'loading') {
    return;
  }
  return new Promise(resolve => {
    document.addEventListener('DOMContentLoaded', () => {
      resolve();
    });
  });
}
