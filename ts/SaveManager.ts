import { AppData } from './AppData.js';

export class SaveManager {


    static appDataKey: string = 'appData';

    /**
     * 从本地存储加载appData
     * @function
     * @param {AppData} appData - 应用数据
     * @returns {AppData} 应用数据
     */
    static loadAppData(): AppData {
        if (localStorage.getItem(this.appDataKey)) {
            return JSON.parse(localStorage.getItem(this.appDataKey) || '{}');
        } else {

            console.warn("没有找到appData，但是创建了新的appData");
            this.saveAppData(new AppData());
            return this.loadAppData();
        }
    }

    static saveAppData(appData: AppData) {
        localStorage.setItem(this.appDataKey, JSON.stringify(appData));
    }

    // /** 
    // * 从本地存储加载待办事项和已完成事项
    // * @function
    // */
    // static loadTodos() {
    //     const todos = JSON.parse(localStorage.getItem(this.todosKey) || '[]');
    //     const completedTodos = JSON.parse(localStorage.getItem(this.completedTodosKey) || '[]');

    //     todos.forEach((todoText: string) => {
    //         ElementCreator.createTodoLi(todoText);
    //     });

    //     completedTodos.forEach((todoText: string) => {
    //         ElementCreator.createCompletedLi(todoText);
    //     });
    // }

    // /** 
    //  * 保存待办事项和已完成事项到本地存储
    //  * @function
    //  */
    // static saveTodos() {
    //     const todos: string[] = [];
    //     ElementGetter.todoList?.querySelectorAll('li').forEach(li => {
    //         todos.push(li.firstChild?.textContent ?? '');
    //     });
    //     localStorage.setItem(this.todosKey, JSON.stringify(todos));

    //     const completedTodos: string[] = [];
    //     ElementGetter.completedList?.querySelectorAll('li').forEach(li => {
    //         completedTodos.push(li.firstChild?.textContent ?? '');
    //     });
    //     localStorage.setItem(this.completedTodosKey, JSON.stringify(completedTodos));
    // }

}

