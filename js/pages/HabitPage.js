import { Page } from './Page.js';
import { SaveManager } from '../SaveManager.js';
import { ElementCreator } from '../ElementCreator.js';
import { ElementGetter } from '../ElementGetter.js';
/**
 * 习惯页面类
 * @class
 * @extends Page
 * @method onEnter
 * @method onLeave
 */
export class HabitPage extends Page {
    onEnter(appData) {
        HabitPage.updatePage(appData);
        // 添加按钮点击事件
        $('#complete-today-button').on('click', () => {
            HabitPage.moveCompletedToTodos(appData);
        });
    }
    onLeave() {
    }
    /**
     * 将所有已完成事项移回待办事项
     * @function
     */
    static moveCompletedToTodos(appData) {
        $('#completed-list li').each(function () {
            const todoText = $(this).find("span").text();
            console.log(todoText);
            ElementCreator.createTodoLi(todoText);
            $(this).remove();
        });
        appData.todos.push(...appData.completedTodos);
        appData.completedTodos = [];
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