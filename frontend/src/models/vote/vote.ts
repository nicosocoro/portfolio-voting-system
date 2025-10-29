export class Vote {
    id: string;
    title: string;
    options: string[];
    endDate: Date;

    constructor(id: string, title: string, options: string[], endDate: Date) {
        this.id = id;
        this.title = title;
        this.options = options;
        this.endDate = endDate;
    }
}