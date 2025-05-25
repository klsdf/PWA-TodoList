class PlanItem {
    date: Date;
    dayOfWeek: string;
    content: string[];

    constructor(date: Date, dayOfWeek: string, content: string[]) {
        this.date = date;
        this.dayOfWeek = dayOfWeek;
        this.content = content;
    }
}

class AppData {
    lastVisitDate: string = '';
    todos: string[] = [];
    completedTodos: string[] = [];
    planItems: PlanItem[] = [];

}

export { AppData, PlanItem };
