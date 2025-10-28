import { Id } from "../id";

export class VoteOption {
    id: Id;
    description: string;
    order: number;

    constructor(id: Id, description: string, order: number) {
        this.id = id;
        this.description = description;
        this.order = order;
    }
}