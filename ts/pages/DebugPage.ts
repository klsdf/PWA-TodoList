import { Page } from './Page.js';
import { AppData } from '../AppData.js';

export class DebugPage extends Page {
    override onEnter(appData: AppData) {
        DebugPage.displayJsonData(appData);
    }
    override onLeave() {

    }
    /** 
      * 显示存档的JSON数据
      * @function
      */
    static displayJsonData(appData: AppData) {
        $('#json-display').text("appData:\n" + JSON.stringify(appData, null, 2));
    }
}


