class PlanItem {
    constructor(date, dayOfWeek, content) {
        this.date = date;
        this.dayOfWeek = dayOfWeek;
        this.content = content;
    }
}
class AppData {
    constructor() {
        this.lastVisitDate = '';
        this.todos = [];
        this.completedTodos = [];
        this.planItems = [];
    }
}
export { AppData, PlanItem };
//# sourceMappingURL=AppData.js.map