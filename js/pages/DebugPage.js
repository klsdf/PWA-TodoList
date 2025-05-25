import { Page } from './Page.js';
import { SaveManager } from '../SaveManager.js';
export class DebugPage extends Page {
    onEnter(appData) {
        DebugPage.displayJsonData(appData);
        // 添加输入框和按钮
        const inputContainer = document.getElementById('json-input-container');
        if (inputContainer) {
            const saveButton = document.getElementById('save-json-button');
            saveButton?.addEventListener('click', () => {
                const jsonInput = document.getElementById('json-input');
                if (jsonInput) {
                    try {
                        const newData = JSON.parse(jsonInput.value);
                        Object.assign(appData, newData); // 更新 appData
                        SaveManager.saveAppData(appData); // 保存数据
                        alert('JSON 数据已保存');
                    }
                    catch (error) {
                        alert('无效的 JSON 数据');
                    }
                }
            });
            const deleteButton = document.getElementById('delete-json-button');
            deleteButton?.addEventListener('click', () => {
                localStorage.removeItem(SaveManager.appDataKey); // 删除存档
                alert('存档已删除');
            });
        }
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