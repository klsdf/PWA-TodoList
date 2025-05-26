class PlanItem {
    dateToDayString: string;
    dayOfWeek: string;
    content: string[];

    constructor(dateToDayString: string, dayOfWeek: string, content: string[]) {
        this.dateToDayString = dateToDayString;
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
