import { Id } from "../domain/models/id";
import { Vote } from "../domain/models/vote/vote";
import { VotesRepository } from "../domain/repositories/vote/votesRepository";

export class FindVote {
    private votesRepository: VotesRepository;

    constructor(votesRepository: VotesRepository) {
        this.votesRepository = votesRepository;
    }

    async call(voteId: Id): Promise<Vote | null> {
        return await this.votesRepository.findBy(voteId);
    }
}
