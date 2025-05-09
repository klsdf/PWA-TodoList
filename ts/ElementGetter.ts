
export class ElementGetter {

    private static getElementById(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    static newTodoInput = ElementGetter.getElementById('new-todo') as HTMLInputElement | null;
    static addTodoButton = ElementGetter.getElementById('add-todo') as HTMLButtonElement | null;
    static todoList = ElementGetter.getElementById('todo-list') as HTMLElement | null;
    static completedList = ElementGetter.getElementById('completed-list') as HTMLElement | null;
}
