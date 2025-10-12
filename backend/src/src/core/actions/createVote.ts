import { VoteTitleMustHaveAtLeastFiveCharactersException, VoteEndDateInPastException, VoteMustHaveAtLeastTwoOptionsException } from "../domain/exceptions/vote.exceptions";
import { Vote } from "../domain/models/vote";
import { Clock } from "../domain/services/clock";
import { IdGenerator } from "../domain/services/idGenerator";

export class CreateVote {
    private idGenerator: IdGenerator;
    private clock: Clock;

    constructor(idGenerator: IdGenerator, clock: Clock) {
        this.idGenerator = idGenerator;
        this.clock = clock;
    }

    async call(params: CreateVoteParams): Promise<Vote> {
        this.validate(params);

        const id = await this.idGenerator.generate();
        const vote = new Vote(id, params.title, params.options, this.clock.now(), params.endDate);
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
