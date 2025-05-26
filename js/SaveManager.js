import { AppData } from './AppData.js';
export class SaveManager {
    /**
     * 从本地存储加载appData
     * @function
     * @param {AppData} appData - 应用数据
     * @returns {AppData} 应用数据
     */
    static loadAppData() {
        if (localStorage.getItem(this.appDataKey)) {
            return JSON.parse(localStorage.getItem(this.appDataKey) || '{}');
        }
        else {
            console.warn("没有找到appData，但是创建了新的appData");
            this.saveAppData(new AppData());
            return this.loadAppData();
        }
    }
    static saveAppData(appData) {
        localStorage.setItem(this.appDataKey, JSON.stringify(appData));
    }
}
SaveManager.appDataKey = 'appData';
//# sourceMappingURL=SaveManager.js.map