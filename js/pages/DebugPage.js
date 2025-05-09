import { Page } from './Page.js';
export class DebugPage extends Page {
    static onEnter(appData) {
        DebugPage.displayJsonData(appData);
    }
    onLeave() {
    }
    /**
      * 显示存档的JSON数据
      * @function
      */
    static displayJsonData(appData) {
        $('#json-display').text(JSON.stringify(appData, null, 2));
    }
}
//# sourceMappingURL=DebugPage.js.map