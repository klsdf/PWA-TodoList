class ElementCreator {
    /** 
     * 将待办事项添加到DOM
     * @function
     * @param {string} todoText - 待办事项的文本内容
     */
    static createTodoLi(elementText) {
        this.addItemToDOM(elementText, todoList, ElementCreator.onClickTodoLi);
    }



    /** 
     * 将已完成事项添加到DOM
     * @function
     * @param {string} todoText - 已完成事项的文本内容
     */
    static createCompletedLi(todoText) {
        this.addItemToDOM(todoText, completedList, ElementCreator.onClickCompletedLi);
    }



    /** 
     * 点击事件
     * @function
     * @param {string} todoText - 事项的文本内容
     * @param {HTMLElement} list - 要添加到的列表元素
     */
    static onClickTodoLi(event) {
        const todoText = event.target.firstChild.textContent;
        ElementCreator.createCompletedLi(todoText);
        //注意这里使用的是event.currentTarget，而不是event.target
        //确保点击的元素是li，而不是span，因为event.currentTarget指的是事件处理程序绑定的元素，而不是鼠标点击的具体位置。
        todoList.removeChild(event.currentTarget);
        SaveManager.saveTodos();

        // 当任务完成时进行震动
        if (navigator.vibrate) {
            navigator.vibrate(100); // 震动100毫秒
        } else {
            console.log('浏览器不支持震动');
        }
    }

    static onClickCompletedLi(event) {
        const todoText = event.target.firstChild.textContent;
        ElementCreator.createTodoLi(todoText);
        completedList.removeChild(event.currentTarget);
        SaveManager.saveTodos();
    }



    /** 
     * 将事项添加到指定的DOM列表中
     * @function
     * @param {string} todoText - 事项的文本内容
     * @param {HTMLElement} list - 要添加到的列表元素
     * @param {function} onClickLi - li元素的点击事件处理程序
     */
    static addItemToDOM(todoText, list, onClickLi) {
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = todoText;
        li.appendChild(span);
        li.addEventListener('click', onClickLi);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除';
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // 阻止事件冒泡
            list.removeChild(li);
            SaveManager.saveTodos();
        });
        li.appendChild(deleteButton);
        list.appendChild(li);
    }

}



class SaveManager {


    static loadLastVisitDate() {
        return localStorage.getItem('lastVisitDate');
    }

    static saveLastVisitDate(lastVisitDate) {
        localStorage.setItem('lastVisitDate', lastVisitDate);
    }

    /** 
    * 从本地存储加载待办事项和已完成事项
    * @function
    */
    static loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        const completedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];

        todos.forEach(todoText => {
            ElementCreator.createTodoLi(todoText);
        });

        completedTodos.forEach(todoText => {
            ElementCreator.createCompletedLi(todoText);
        });
    }

    /** 
     * 保存待办事项和已完成事项到本地存储
     * @function
     */
    static saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push(li.firstChild.textContent);
        });
        localStorage.setItem('todos', JSON.stringify(todos));

        const completedTodos = [];
        completedList.querySelectorAll('li').forEach(li => {
            completedTodos.push(li.firstChild.textContent);
        });
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    }

}





// 获取DOM元素
const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');


/** 
 * 添加待办事项
 * @function
 */
addTodoButton.addEventListener('click', () => {
    const todoText = newTodoInput.value.trim();
    if (todoText !== '') {
        ElementCreator.createTodoLi(todoText);
        SaveManager.saveTodos();
        newTodoInput.value = ''; // 清空输入框
    }
});

/** 
 * 检查并更新待办事项
 * @function
 */
function checkAndUpdateTodos() {
    const lastVisitDate = SaveManager.loadLastVisitDate();
    const currentDate = new Date().toLocaleString();

    if (lastVisitDate !== currentDate.split(',')[0]) {
        // 如果是新的一天，将所有已完成事项移回待办事项
        $('#completed-list li').each(function () {
            const todoText = $(this).text();
            ElementCreator.createTodoLi(todoText);
            $(this).remove();
        });
        SaveManager.saveTodos();
    }

    // 更新最后访问日期
    SaveManager.saveLastVisitDate(currentDate);
}

// 页面加载时检查日期
$(document).ready(() => {
    checkAndUpdateTodos();
    SaveManager.loadTodos();
});



/** 
     * 显示存档的JSON数据
     * @function
     */
function displayJsonData() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const completedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];
    const lastVisitDate = SaveManager.loadLastVisitDate();
    const jsonData = {
        todos: todos,
        completedTodos: completedTodos,
        lastVisitDate: lastVisitDate
    };
    $('#json-display').text(JSON.stringify(jsonData, null, 2));
}


class PageChanger {
    /** 
     * 显示指定页面
     * @function
     * @param {string} pageId - 要显示的页面的ID
     */
    static showPage(pageId) {
        // 隐藏所有页面
        $('.page').hide();
        // 显示指定页面
        $(`#${pageId}`).show();
    }



}

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
    displayJsonData();
});
