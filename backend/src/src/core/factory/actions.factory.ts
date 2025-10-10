import { CreateVote } from "../actions/createVote";

export class ActionsFactory {
    static createVote(): CreateVote {
        return new CreateVote();
    }
}