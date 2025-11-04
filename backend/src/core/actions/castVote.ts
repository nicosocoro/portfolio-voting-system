import { VoteNotFoundException, VoteOptionNotFoundException } from "../domain/exceptions/vote.exceptions";
import { Id } from "../domain/models/id";
import { Vote } from "../domain/models/vote/vote";
import { VotesRepository } from "../domain/repositories/vote/votesRepository";

export class CastVote {
    private votesRepository: VotesRepository;

    constructor(votesRepository: VotesRepository) {
        this.votesRepository = votesRepository;
    }

    async call(params: CastVoteParams): Promise<Vote> {
        const vote = await this.votesRepository.findBy(new Id(params.voteId));
        if (!vote) {
            throw new VoteNotFoundException(params.voteId);
        }
        vote.incrementOptionVote(params.optionId);
        await this.votesRepository.update(vote);
        return vote;
    }
}

export class CastVoteParams {
    voteId: string;
    optionId: string;

    constructor(voteId: string, optionId: string) {
        this.voteId = voteId;
        this.optionId = optionId;
    }
}