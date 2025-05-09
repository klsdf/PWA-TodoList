export class ElementGetter {
    static getElementById(id) {
        return document.getElementById(id);
    }
}
ElementGetter.newTodoInput = ElementGetter.getElementById('new-todo');
ElementGetter.addTodoButton = ElementGetter.getElementById('add-todo');
ElementGetter.todoList = ElementGetter.getElementById('todo-list');
ElementGetter.completedList = ElementGetter.getElementById('completed-list');
//# sourceMappingURL=ElementGetter.js.map