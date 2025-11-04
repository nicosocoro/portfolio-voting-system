export class VoteTitleMustHaveAtLeastFiveCharactersException extends Error {}

export class VoteEndDateInPastException extends Error {}

export class VoteMustHaveAtLeastTwoOptionsException extends Error {}

export class VoteNotFoundException extends Error {
    voteId: string;

    constructor(voteId: string) {
        super(`Vote with ID ${voteId} not found.`);
        this.voteId = voteId;
    }
}

export class VoteOptionNotFoundException extends Error {
    voteId: string;
    optionId: string;

    constructor(voteId: string, optionId: string) {
        super(`Vote option with ID ${optionId} not found in vote ${voteId}.`);
        this.voteId = voteId;
        this.optionId = optionId;
    }
}