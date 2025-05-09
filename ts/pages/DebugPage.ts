import { Page } from './Page.js';
import { AppData } from '../AppData.js';

export class DebugPage extends Page {
    static onEnter(appData: AppData) {
        DebugPage.displayJsonData(appData);
    }
    onLeave() {

    }
    /** 
      * 显示存档的JSON数据
      * @function
      */
    static displayJsonData(appData: AppData) {
        $('#json-display').text(JSON.stringify(appData, null, 2));
    }
}


