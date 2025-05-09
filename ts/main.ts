import { ElementCreator } from './ElementCreator.js';
import { ElementGetter } from './ElementGetter.js';
import { SaveManager } from './SaveManager.js';
import { AppData } from './AppData.js';
import { PageChanger } from './PageChanger.js';

export abstract class Page {
    // abstract onEnter(): void;
    // abstract onLeave(): void;
}

class TestPage extends Page {
    static onEnter() {
        TestPage.displayJsonData();
    }
    onLeave() {

    }
    /** 
      * 显示存档的JSON数据
      * @function
      */
    static displayJsonData() {
        const appData: AppData = SaveManager.loadAppData();
        $('#json-display').text(JSON.stringify(appData, null, 2));
    }
}


class HabitPage extends Page {
    static onEnter(appData: AppData) {
        HabitPage.updatePage(appData);
        // HabitPage.checkAndUpdateTodos(appData);
    }
    onLeave() {


    }
    /** 
        * 检查并更新待办事项
        * @function
        */
    static checkAndUpdateTodos(appData: AppData) {
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


    static updatePage(appData: AppData) {
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





// 页面加载时检查日期
$(function () {


    //初始化数据
    const appData: AppData = SaveManager.loadAppData();

    console.log("appData", appData);


    HabitPage.onEnter(appData);

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
        } else {
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

    // 修改按钮的事件处理程序以使用PageChanger类
    $('#habit-button').on('click', () => PageChanger.showPage('habit-page'));
    $('#plan-button').on('click', () => PageChanger.showPage('plan-page'));
    $('#stats-button').on('click', () => PageChanger.showPage('stats-page'));
    $('#debug-button').on('click', () => {
        PageChanger.showPage('debug-page');
        TestPage.displayJsonData();
    });



});

