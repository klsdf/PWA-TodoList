import { ElementCreator } from './ElementCreator.js';
import { ElementGetter } from './ElementGetter.js';
import { SaveManager } from './SaveManager.js';
import { PageChanger } from './PageChanger.js';
import { PageId } from './PageChanger.js';
// 页面加载时检查日期
$(function () {
    //初始化数据
    const appData = SaveManager.loadAppData();
    console.log("appData", appData);
    PageChanger.init();
    PageChanger.showPage(PageId.Habit);
    /**
     * 添加新的待办事项
     * @function
     */
    ElementGetter.addTodoButton?.addEventListener('click', () => {
        const todoText = ElementGetter.newTodoInput?.value.trim();
        if (todoText) {
            ElementCreator.createTodoLi(todoText);
            appData.todos.push(todoText);
            SaveManager.saveAppData(appData);
            if (ElementGetter.newTodoInput) {
                ElementGetter.newTodoInput.value = ''; // 清空输入框
            }
        }
        else {
            console.error('输入的待办事项文本为空');
        }
    });
    // 复制JSON到剪贴板
    $('#copy-json-button').on('click', () => {
        const jsonText = $('#json-display').text();
        navigator.clipboard.writeText(jsonText).then(() => {
            alert('JSON已复制到剪贴板');
        }).catch((error) => {
            console.error('复制失败:', error);
        });
    });
});
//# sourceMappingURL=main.js.map