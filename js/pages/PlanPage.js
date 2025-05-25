import { Page } from './Page.js';
import { PlanItem } from '../AppData.js';
import { SaveManager } from '../SaveManager.js';
/**
 * 计划页面类
 * @class
 * @extends Page
 * @method onEnter
 * @method onLeave
 */
export class PlanPage extends Page {
    /**
     * 当进入页面时调用
     * @param {AppData} appData - 应用数据
     */
    onEnter(appData) {
        console.log("PlanPage onEnter");
        const planContainer = document.getElementById('plan-page');
        if (planContainer) {
            planContainer.innerHTML = ''; // 清空之前的内容
            const table = document.createElement('table');
            table.className = 'plan-table';
            const today = new Date();
            const daysOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            // 从存储中加载计划项
            const savedAppData = SaveManager.loadAppData();
            const planItems = savedAppData.planItems || [];
            for (let i = -7; i <= 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                const dayOfWeek = daysOfWeek[date.getDay()];
                const dateString = date.toLocaleDateString();
                const row = document.createElement('tr');
                const dateCell = document.createElement('td');
                dateCell.textContent = dateString;
                row.appendChild(dateCell);
                const dayCell = document.createElement('td');
                dayCell.textContent = dayOfWeek;
                row.appendChild(dayCell);
                const contentCell = document.createElement('td');
                contentCell.contentEditable = 'true'; // 使单元格内容可编辑
                // 查找是否有已保存的计划项
                const savedItem = planItems.find(item => new Date(item.date).toDateString() === date.toDateString());
                if (savedItem) {
                    // 如果有保存的内容，加载它
                    contentCell.innerHTML = `<ul>${savedItem.content.map(text => `<li>${text}</li>`).join('')}</ul>`;
                }
                else {
                    // 如果没有保存的内容，使用默认内容
                    contentCell.innerHTML = '<ul><li>内容</li></ul>';
                }
                contentCell.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault(); // 阻止默认的回车行为
                        document.execCommand('insertHTML', false, '<li><br></li>'); // 插入新的 <li>
                    }
                });
                contentCell.addEventListener('blur', () => {
                    console.log('编辑完成'); // 当失去焦点时打印
                    const listItems = contentCell.querySelectorAll('li');
                    const content = Array.from(listItems).map(li => li.textContent || '');
                    const planItem = new PlanItem(date, dayOfWeek, content);
                    appData.planItems.push(planItem);
                    SaveManager.saveAppData(appData); // 保存数据
                });
                row.appendChild(contentCell);
                // 根据日期设置行的类名
                if (date.toDateString() === today.toDateString()) {
                    row.classList.add('current-day'); // 当前天
                }
                else if (date < today) {
                    row.classList.add('past-day'); // 过去的天
                }
                table.appendChild(row);
            }
            planContainer.appendChild(table);
        }
    }
    onLeave() {
        // 离开页面时的逻辑
    }
}
//# sourceMappingURL=PlanPage.js.map