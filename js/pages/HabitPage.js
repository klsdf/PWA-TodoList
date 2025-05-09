import { Page } from './Page.js';
import { SaveManager } from '../SaveManager.js';
import { ElementCreator } from '../ElementCreator.js';
import { ElementGetter } from '../ElementGetter.js';
export class HabitPage extends Page {
    static onEnter(appData) {
        HabitPage.updatePage(appData);
        // HabitPage.checkAndUpdateTodos(appData);
    }
    onLeave() {
    }
    /**
        * 检查并更新待办事项
        * @function
        */
    static checkAndUpdateTodos(appData) {
        const lastVisitDate = appData.lastVisitDate;
        const currentDate = new Date().toLocaleString();
        if (lastVisitDate !== currentDate.split(',')[0]) {
            // 如果是新的一天，将所有已完成事项移回待办事项
            $('#completed-list li').each(function () {
                const todoText = $(this).text();
                ElementCreator.createTodoLi(todoText);
                $(this).remove();
            });
            appData.todos.push(...appData.completedTodos);
            appData.completedTodos = [];
            SaveManager.saveAppData(appData);
        }
        // 更新最后访问日期
        appData.lastVisitDate = currentDate;
        SaveManager.saveAppData(appData);
    }
    static updatePage(appData) {
        const todos = appData.todos;
        const completedTodos = appData.completedTodos;
        if (ElementGetter.todoList) {
            ElementGetter.todoList.innerHTML = '';
        }
        if (ElementGetter.completedList) {
            ElementGetter.completedList.innerHTML = '';
        }
        for (const todo of todos) {
            ElementCreator.createTodoLi(todo);
        }
        for (const completedTodo of completedTodos) {
            ElementCreator.createCompletedLi(completedTodo);
        }
    }
}
//# sourceMappingURL=HabitPage.js.map