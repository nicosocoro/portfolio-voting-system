import { VoteTitleMustHaveAtLeastFiveCharactersException, VoteEndDateInPastException, VoteMustHaveAtLeastTwoOptionsException } from "../domain/exceptions/vote.exceptions";
import { Id } from "../domain/models/id";
import { Vote } from "../domain/models/vote";
import { VoteOption } from "../domain/models/voteOption";
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

        const voteOptions = params.options.map((option, index) => {
            const order = index + 1;
            return new VoteOption(new Id(order.toString()), option, order);
        });

        const vote = new Vote(id, params.title, voteOptions, this.clock.now(), params.endDate);
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
