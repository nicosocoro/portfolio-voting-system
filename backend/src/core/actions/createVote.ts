import { VoteTitleMustHaveAtLeastFiveCharactersException, VoteEndDateInPastException, VoteMustHaveAtLeastTwoOptionsException } from "../domain/exceptions/vote.exceptions";
import { Id } from "../domain/models/id";
import { Vote } from "../domain/models/vote/vote";
import { VoteOption } from "../domain/models/vote/voteOption";
import { VotesRepository } from "../domain/repositories/vote/votesRepository";
import { Clock } from "../domain/services/clock";
import { IdGenerator } from "../domain/services/idGenerator";

export class CreateVote {
    private idGenerator: IdGenerator;
    private clock: Clock;
    private votesRepository: VotesRepository;

    constructor(idGenerator: IdGenerator, clock: Clock, votesRepository: VotesRepository) {
        this.idGenerator = idGenerator;
        this.clock = clock;
        this.votesRepository = votesRepository;
    }

    async call(params: CreateVoteParams): Promise<Vote> {
        this.validate(params);
        const vote = await this.buildVoteFrom(params);
        await this.votesRepository.add(vote);
        return vote;
    }

    private validate(params: CreateVoteParams) {
        if (!params.title || params.title.trim().length < 5) {
            throw new VoteTitleMustHaveAtLeastFiveCharactersException("Vote title must have at least 5 characters.");
        }

        if (params.endDate < this.clock.now()) {
            throw new VoteEndDateInPastException("Vote end date cannot be in the past.");
        }

        if (params.options.length < 2) {
            throw new VoteMustHaveAtLeastTwoOptionsException("Vote must have at least two options.");
        }
    }

    private async buildVoteFrom(params: CreateVoteParams) {
        const id = await this.idGenerator.generate();

        const voteOptions = params.options.map((option, order) => {
            const id = new Id(order.toString());
            const votesCount = 0;
            return new VoteOption(id, option, order, votesCount);
        });

        const creationDate = this.clock.now();
        return new Vote(id, params.title, voteOptions, creationDate, params.endDate);
    }
}

export class CreateVoteParams {
    title: string;
    options: string[];
    endDate: Date;

    constructor(title: string, options: string[], endDate: Date) {
        this.title = title;
        this.options = options;
        this.endDate = endDate;
    }
}
