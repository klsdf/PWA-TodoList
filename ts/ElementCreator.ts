import { ElementGetter } from './ElementGetter.js'; // 确保路径正确
import { SaveManager } from './SaveManager.js';
import { AppData } from './AppData.js';

export class ElementCreator {
    /** 
     * 将待办事项添加到DOM
     * @function
     * @param {string} todoText - 待办事项的文本内容
     */
    static createTodoLi(elementText: string | null) {
        if (elementText) {
            this.addItemToDOM(elementText, ElementGetter.todoList, ElementCreator.onClickTodoLi);
        } else {
            console.error('待办事项文本为空！');
        }
    }

    /** 
     * 将已完成事项添加到DOM
     * @function
     * @param {string} todoText - 已完成事项的文本内容
     */
    static createCompletedLi(todoText: string | null) {
        if (todoText) {
            this.addItemToDOM(todoText, ElementGetter.completedList, ElementCreator.onClickCompletedLi);
        } else {
            console.error('已完成事项文本为空！');
        }
    }


    /** 
     * 点击todo的li元素
     * @function
     * @param {string} todoText - 事项的文本内容
     * @param {HTMLElement} list - 要添加到的列表元素
     */
    static onClickTodoLi(event: Event) {
        //注意这里使用的是event.currentTarget，而不是event.target
        //确保点击的元素是li，而不是span，因为event.currentTarget指的是事件处理程序绑定的元素，而不是鼠标点击的具体位置。
        const li = event.currentTarget as HTMLElement;
        const spanElement = li.firstChild as HTMLElement;
        const todoText = spanElement.textContent;
        ElementCreator.createCompletedLi(todoText);

        ElementGetter.todoList?.removeChild(li);


        if (todoText) {
            const appData: AppData = SaveManager.loadAppData();
            appData.todos.splice(appData.todos.indexOf(todoText), 1);
            appData.completedTodos.push(todoText);
            SaveManager.saveAppData(appData);
        }

        // 当任务完成时进行震动
        if (navigator.vibrate) {
            navigator.vibrate(100); // 震动100毫秒
        } else {
            console.log('浏览器不支持震动');
        }
    }

    static onClickCompletedLi(event: Event) {
        const li = event.currentTarget as HTMLElement;
        const spanElement = li.firstChild as HTMLElement;
        const todoText = spanElement.textContent;
        ElementCreator.createTodoLi(todoText);
        ElementGetter.completedList?.removeChild(li);

        if (todoText) {
            const appData: AppData = SaveManager.loadAppData();
            appData.completedTodos.splice(appData.completedTodos.indexOf(todoText), 1);
            appData.todos.push(todoText);
            SaveManager.saveAppData(appData);
        }
    }

    /** 
     * 将事项添加到指定的DOM列表中
     * @function
     * @param {string} todoText - 事项的文本内容
     * @param {HTMLElement} list - 要添加到的列表元素
     * @param {function} onClickLi - li元素的点击事件处理程序
     */
    static addItemToDOM(todoText: string, list: HTMLElement | null, onClickLi: (event: Event) => void) {
        if (!list) {
            console.error('列表元素为空');
            return;
        }
        const li = ElementCreator.createLi(todoText);
        li.addEventListener('click', onClickLi);

        const deleteButton = ElementCreator.createDeleteButton();
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // 阻止事件冒泡
            list.removeChild(li);
            if (todoText) {
                const appData: AppData = SaveManager.loadAppData();
                appData.todos.splice(appData.todos.indexOf(todoText), 1);
                SaveManager.saveAppData(appData);
            }
        });
        li.appendChild(deleteButton);
        list.appendChild(li);
    }




    static createDeleteButton(): HTMLElement {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        return deleteButton;
    }

    static createLi(text:string): HTMLElement {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = text;
        li.appendChild(span);
        return li;
    }


}
