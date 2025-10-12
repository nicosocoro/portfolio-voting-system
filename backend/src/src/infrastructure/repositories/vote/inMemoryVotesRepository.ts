import { Vote } from "../../../core/domain/models/vote/vote";
import { VotesRepository } from "../../../core/domain/repositories/vote/votesRepository";

export class InMemoryVotesRepository implements VotesRepository {
    private votes: Vote[] = [];
    
    async add(vote: Vote): Promise<void> {
        this.votes.push(vote);
    }
}