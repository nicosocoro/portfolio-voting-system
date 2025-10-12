import { Id } from "./id";

export class Vote {
    constructor(id: Id, title: string, options: string[], creationDate: Date, endDate: Date) {
        this.id = id;
        this.title = title;
        this.options = options;
        this.creationDate = creationDate;
        this.endDate = endDate;
    }

    id: Id;
    title: string;
    options: string[];
    creationDate: Date;
    endDate: Date;
}
