import { Page } from './Page.js';
import { AppData } from '../AppData.js';

/**
 * 统计页面类
 * @class
 * @extends Page
 * @method onEnter
 * @method onLeave
 */
export class StatsPage extends Page {
    
    /**
     * 当进入页面时调用
     * @param {AppData} appData - 应用数据
     */
    override onEnter(appData: AppData) {
        console.log("StatsPage onEnter");

        // 获取待办事项和已完成事项的数量
        const totalTodos = appData.todos.length;
        const completedTodos = appData.completedTodos.length;

        // 更新页面上的统计信息
        const completedCountElement = document.getElementById('completed-count');
        if (completedCountElement) {
            completedCountElement.textContent = `今日完成：${completedTodos} / ${totalTodos + completedTodos}`;
        }
    }

    override onLeave() {
        // 离开页面时的逻辑
    }
}


