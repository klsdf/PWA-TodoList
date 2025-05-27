declare var Sortable: any;

import { Page } from './Page.js';
import { AppData, PlanItem } from '../AppData.js';
import { SaveManager } from '../SaveManager.js';


function dateToDayString(date: Date): string {
    return date.toISOString().slice(0, 10); // "2024-06-08"
}


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
    override onEnter(appData: AppData) {
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


                const row = document.createElement('tr');

                const dateCell = document.createElement('td');
                dateCell.classList.add('date-cell');
                dateCell.textContent = dateToDayString(date);
                row.appendChild(dateCell);

                const dayCell = document.createElement('td');
                dayCell.classList.add('day-cell');
                dayCell.textContent = dayOfWeek;
                row.appendChild(dayCell);

                const contentCell = document.createElement('td');
                contentCell.classList.add('content-cell');
                const ul = document.createElement('ul');



                // 为ul添加sortable
                new Sortable(ul, {
                    group: 'plan-list',
                    handle: '.drag-handle',
                    animation: 150,
                    emptyInsertThreshold: 20, // 鼠标距离ul边缘20px内可插入
                    onEnd: (evt: any) => {
                        this.savePlanItem(evt.from);
                        if (evt.to !== evt.from) {
                            this.savePlanItem(evt.to);
                        }
                        console.log("拖拽结束");
                    }
                });

                contentCell.appendChild(ul);
                // contentCell.contentEditable = 'true'; // 使单元格内容可编辑

                // 查找是否有已保存的计划项
                const savedItem: PlanItem | undefined = planItems.find(
                    item => item.dateToDayString === dateToDayString(date));
                if (savedItem) {
                    // 如果有保存的内容，加载它
                    for (const text of savedItem.content) {
                        this.addLiToUl(ul, date, dayOfWeek, text);
                    }
                    // contentCell.innerHTML =
                    //     `<ul>${savedItem.content.map(text =>
                    //         `<li class="todo-item"><span class="drag-handle"></span><span contenteditable="true" class="todo-text">${text}</span></li>`).join('')}</ul>`;
                } else {
                    // 如果没有保存的内容，使用默认内容
                    this.addLiToUl(ul, date, dayOfWeek, "内容");
                }


                row.appendChild(contentCell);

                // 根据日期设置行的类名
                if (date.toDateString() === today.toDateString()) {
                    row.classList.add('current-day'); // 当前天
                } else if (date < today) {
                    row.classList.add('past-day'); // 过去的天
                } else {
                    row.classList.add('future-day'); // 未来的天
                }
                table.appendChild(row);
            }

            planContainer.appendChild(table);
        }

    }



    savePlanItem(ul: HTMLElement) {
        const listItems = ul.querySelectorAll('li');
        const content: string[] = Array.from(listItems).map(li => li.textContent || '');



        const dateStr = ul.parentElement?.parentElement?.querySelector('.date-cell')?.textContent;
        const dayOfWeekStr = ul.parentElement?.parentElement?.querySelector('.day-cell')?.textContent;

        const planItem = new PlanItem(dateStr ?? "", dayOfWeekStr ?? "", content);

        const savedAppData = SaveManager.loadAppData();
        const planItems = savedAppData.planItems || [];
        console.log(planItems);
        const idx = planItems.findIndex(item => item.dateToDayString === dateStr);

        if (idx !== -1) {
            // 覆盖内容
            planItems[idx].content = content;
        } else {
            // 新增
            planItems.push(planItem);
        }
        savedAppData.planItems = planItems;
        SaveManager.saveAppData(savedAppData); // 保存数据
    }


    /**
     * 添加一个li到ul中
     * @param {HTMLElement} ul - 要添加li的ul
     * @param {Date} date - 日期
     * @param {string} dayOfWeek - 星期几
     * @param {string} content - 内容
     */
    addLiToUl(ul: HTMLElement, date: Date, dayOfWeek: string, content: string): HTMLElement {

        const li = document.createElement('li');
        li.classList.add('todo-item');

        const dragHandle = document.createElement('span');
        dragHandle.classList.add('drag-handle');







        li.appendChild(dragHandle);

        const text = document.createElement('span');
        text.classList.add('todo-text');
        text.textContent = content;
        text.contentEditable = 'true';
        li.appendChild(text);

        // li.innerHTML = `<span class="drag-handle"></span><span contenteditable="true" class="todo-text">${content}</span>`;

        text.addEventListener('blur', () => {
            console.log('编辑完成'); // 当失去焦点时打印
            this.savePlanItem(ul);
        });



        //为每一个li添加keydown事件

        text.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // 阻止默认的回车行为
                const newText = this.addLiToUl(ul, date, dayOfWeek, "内容");
                // 聚焦新输入框
                if (newText) {
                    // 将光标移动到内容末尾
                    newText.focus();
                    // 可选：将光标放到内容最后
                    const range = document.createRange();
                    range.selectNodeContents(newText);
                    range.collapse(false);
                    const sel = window.getSelection();
                    sel?.removeAllRanges();
                    sel?.addRange(range);
                }
            }
        });




        ul.appendChild(li);

        return text; // 返回新建的输入框
    }

    override onLeave() {
        // 离开页面时的逻辑
    }
}


