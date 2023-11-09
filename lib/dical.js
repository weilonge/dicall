class Dical {
  static async create(show, hide) {
    const dical = new Dical();
    await dical.init(show, hide);
  }

  async init(show, hide) {
    await this.waitForLoad();
    this.showDialog = show;

    document.body.addEventListener('mouseup', () => {
      const selection = this.getSelection();
      if( selection !== '' ){
        this.searchDic(selection);
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
    return selection.toString();
  }

  async yahooDic(p) {
    const api = 'https://tw.dictionary.search.yahoo.com/search?p=' + p;
    const response = await fetch(api);
    const responseText = await response.text();
    const dom = document.createElement('div');
    dom.innerHTML = responseText;
    const dicDom = dom.querySelector('#web > ol');
    if(dicDom){
      this.showDialog(dicDom.innerHTML);
    }
  }

  async demoDic(p) {
    const responseText = `<div id="web"><ol><h1>${p}</h1></ol></div>`;
    const dom = document.createElement('div');
    dom.innerHTML = responseText;
    const dicDom = dom.querySelector('#web > ol');
    if(dicDom){
      this.showDialog(dicDom.innerHTML);
    }
  }

  async searchDic(selectedStr) {
    return this.demoDic(selectedStr);
  }

  async waitForLoad() {
    if (document.readyState !== 'loading') {
      return;
    }
    return new Promise(resolve => {
      document.addEventListener('DOMContentLoaded', () => {
        resolve();
      });
    });
  }
}
