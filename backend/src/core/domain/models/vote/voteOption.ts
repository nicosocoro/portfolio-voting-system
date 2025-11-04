import { Id } from "../id";

export class VoteOption {
    id: Id;
    description: string;
    order: number;
    votesCount: number;

    constructor(id: Id, description: string, order: number, votesCount: number) {
        this.id = id;
        this.description = description;
        this.order = order;
        this.votesCount = votesCount;
    }

    incrementVotes() {
        this.votesCount += 1;
    }
}