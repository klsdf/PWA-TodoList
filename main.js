// 获取DOM元素
const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const completedList = document.getElementById('completed-list');

/** 
 * 从本地存储加载待办事项和已完成事项
 * @function
 */
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const completedTodos = JSON.parse(localStorage.getItem('completedTodos')) || [];

    todos.forEach(todoText => {
        addTodoToDOM(todoText);
    });

    completedTodos.forEach(todoText => {
        addCompletedTodoToDOM(todoText);
    });
}

/** 
 * 将事项添加到指定的DOM列表中
 * @function
 * @param {string} todoText - 事项的文本内容
 * @param {HTMLElement} list - 要添加到的列表元素
 * @param {boolean} isCompleted - 是否为已完成事项
 */
function addItemToDOM(todoText, list) {
    const li = document.createElement('li');
    li.textContent = todoText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '删除';
    deleteButton.addEventListener('click', () => {
        list.removeChild(li);
        saveTodos();
    });
    li.appendChild(deleteButton);
    list.appendChild(li);
}

/** 
 * 将待办事项添加到DOM
 * @function
 * @param {string} todoText - 待办事项的文本内容
 */
function addTodoToDOM(todoText) {
    addItemToDOM(todoText, todoList);
}

/** 
 * 将已完成事项添加到DOM
 * @function
 * @param {string} todoText - 已完成事项的文本内容
 */
function addCompletedTodoToDOM(todoText) {
    addItemToDOM(todoText, completedList);
}

/** 
 * 保存待办事项和已完成事项到本地存储
 * @function
 */
function saveTodos() {
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

/** 
 * 添加待办事项
 * @function
 */
addTodoButton.addEventListener('click', () => {
    const todoText = newTodoInput.value.trim();
    if (todoText !== '') {
        addTodoToDOM(todoText);
        saveTodos();
        newTodoInput.value = ''; // 清空输入框
    }
});

/** 
 * 检查并更新待办事项
 * @function
 */
function checkAndUpdateTodos() {
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    const currentDate = new Date().toLocaleDateString();

    if (lastVisitDate !== currentDate) {
        // 如果是新的一天，将所有已完成事项移回待办事项
        $('#completed-list li').each(function () {
            const todoText = $(this).text();
            addTodoToDOM(todoText);
            $(this).remove();
        });
        saveTodos();
    }

    // 更新最后访问日期
    localStorage.setItem('lastVisitDate', currentDate);
}

// 页面加载时检查日期
$(document).ready(() => {
    checkAndUpdateTodos();
    loadTodos();
});

document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const completedList = document.getElementById('completed-list');

    todoList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const todoText = event.target.firstChild.textContent;
            addCompletedTodoToDOM(todoText);
            todoList.removeChild(event.target);
            saveTodos();
        }
    });

    // 为"今日完成"区域添加点击事件处理程序
    completedList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const todoText = event.target.firstChild.textContent;
            addTodoToDOM(todoText);
            completedList.removeChild(event.target);
            saveTodos();
        }
    });

});

/** 
 * 切换到统计页面
 * @function
 */
function showStatsPage() {
    $('#todo-list, #completed-list').hide();
    $('#stats-page').show();


}

/** 
 * 返回主页
 * @function
 */
function showHomePage() {
    $('#todo-list, #completed-list').show();
    $('#stats-page').hide();
}

// 修改统计按钮的事件处理程序
$('#stats-button').on('click', showStatsPage);

// 修改主页按钮的事件处理程序
$('#home-button').on('click', showHomePage);

