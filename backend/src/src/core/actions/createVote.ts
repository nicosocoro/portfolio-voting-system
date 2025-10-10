import { Vote } from "../domain/models/Vote";

export class CreateVote {
    constructor() {}

    async call(): Promise<Vote> {
        const vote = new Vote("vote123", "Favorite Color", ["Red", "Blue", "Green"], new Date());
        return vote;
    }
}
