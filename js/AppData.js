class PlanItem {
    constructor(dateToDayString, dayOfWeek, content) {
        this.dateToDayString = dateToDayString;
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