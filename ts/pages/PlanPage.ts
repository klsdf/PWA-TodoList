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
                const dateString = date.toLocaleDateString();

                const row = document.createElement('tr');

                const dateCell = document.createElement('td');
                dateCell.textContent = dateString;
                row.appendChild(dateCell);

                const dayCell = document.createElement('td');
                dayCell.textContent = dayOfWeek;
                row.appendChild(dayCell);

                const contentCell = document.createElement('td');
                const ul = document.createElement('ul');

                contentCell.appendChild(ul);
                // contentCell.contentEditable = 'true'; // 使单元格内容可编辑

                // 查找是否有已保存的计划项
                const savedItem: PlanItem | undefined = planItems.find(
                    item => item.dateToDayString === dateToDayString(date));
                if (savedItem) {
                    console.log("找到", savedItem);
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
                    // contentCell.innerHTML =
                    //     `<ul>
                    //     <li class="todo-item"><span class="drag-handle"></span><span contenteditable="true" class="todo-text">内容</span></li>
                    // </ul>`;
                }




                // contentCell.addEventListener('keydown', (event) => {
                //     if (event.key === 'Enter') {
                //         event.preventDefault(); // 阻止默认的回车行为
                //         document.execCommand('insertHTML', false, '<li><br></li>'); // 插入新的 <li>
                //     }
                // });

                // contentCell.addEventListener('blur', () => {
                //     console.log('编辑完成'); // 当失去焦点时打印
                //     const listItems = contentCell.querySelectorAll('li');
                //     const content = Array.from(listItems).map(li => li.textContent || '');
                //     const planItem = new PlanItem(date, dayOfWeek, content);
                //     appData.planItems.push(planItem);
                //     SaveManager.saveAppData(appData); // 保存数据
                // });
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




        // new Sortable(document.getElementById('todo-list'), {
        //     handle: '.drag-handle',
        //     animation: 150,
        //     onEnd: function (evt) {
        //         // 这里可以同步更新appData.todos的顺序
        //     }
        // });
    }



    savePlanItem(ul: HTMLElement, date: Date, dayOfWeek: string) {
        const listItems = ul.querySelectorAll('li');
        const content: string[] = Array.from(listItems).map(li => li.textContent || '');

        const planItem = new PlanItem(dateToDayString(date), dayOfWeek, content);

        const savedAppData = SaveManager.loadAppData();
        const planItems = savedAppData.planItems || [];
        console.log(planItems);
        const idx = planItems.findIndex(item => item.dateToDayString === dateToDayString(date));

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

    addLiToUl(ul: HTMLElement, date: Date, dayOfWeek: string, content: string) {

        const li = document.createElement('li');
        li.classList.add('todo-item');

        const dragHandle = document.createElement('span');
        dragHandle.classList.add('drag-handle');


        new Sortable(ul, {
            handle: '.drag-handle',
            animation: 150,
            onEnd: (evt: any) => {
                this.savePlanItem(ul, date, dayOfWeek);
            }
        });



        li.appendChild(dragHandle);

        const text = document.createElement('span');
        text.classList.add('todo-text');
        text.textContent = content;
        text.contentEditable = 'true';
        li.appendChild(text);

        // li.innerHTML = `<span class="drag-handle"></span><span contenteditable="true" class="todo-text">${content}</span>`;

        text.addEventListener('blur', () => {
            console.log('编辑完成'); // 当失去焦点时打印
            this.savePlanItem(ul, date, dayOfWeek);
        });



        //为每一个li添加keydown事件

        text.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // 阻止默认的回车行为

                this.addLiToUl(ul, date, dayOfWeek, "内容");
            }
        });


        ul.appendChild(li);



        // ul.innerHTML +=
        //     `<li class="todo-item">
        //     <span class="drag-handle">
        //     </span><span contenteditable="true" class="todo-text">${content}</span>
        // </li>`; // 插入新的 <li>
        //为每一个li添加blur事件



    }

    override onLeave() {
        // 离开页面时的逻辑
    }
}


