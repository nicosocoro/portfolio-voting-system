import { Id } from "../../../core/domain/models/id";
import { Vote } from "../../../core/domain/models/vote/vote";
import { VotesRepository } from "../../../core/domain/repositories/vote/votesRepository";

export class InMemoryVotesRepository implements VotesRepository {
    private votes: Vote[] = [];

    async add(vote: Vote): Promise<void> {
        this.votes.push(vote);
    }

    async findBy(voteId: Id): Promise<Vote | null> {
        return this.votes.find(v => v.id.getId() === voteId.getId()) || null;
    }

    async update(vote: Vote): Promise<void> {
        const index = this.votes.findIndex(v => v.id.getId() === vote.id.getId());
        if (index === -1) {
            throw new Error("Vote not found");
        }
        this.votes[index] = vote;
        return Promise.resolve();
    }
}