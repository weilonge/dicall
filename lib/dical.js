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

  searchDic(selectedStr) {
    this.showDialog({
      apiUrl: 'https://tw.dictionary.search.yahoo.com/search?p=' + selectedStr,
    });
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
