import { CreateVote, CreateVoteParams } from "../../../core/actions/createVote";
import { VoteTitleMustHaveAtLeastFiveCharactersException, VoteEndDateInPastException, VoteMustHaveAtLeastTwoOptionsException } from "../../../core/domain/exceptions/vote.exceptions";
import { Id } from "../../../core/domain/models/id";
import { Vote } from "../../../core/domain/models/vote/vote";
import { VoteOption } from "../../../core/domain/models/vote/voteOption";
import { VotesRepository } from "../../../core/domain/repositories/vote/votesRepository";
import { Clock } from "../../../core/domain/services/clock";
import { IdGenerator } from "../../../core/domain/services/idGenerator";

describe("CreateVote should", () => {
    let idGeneratorMock: jest.Mocked<IdGenerator>;
    let clockMock: jest.Mocked<Clock>;  
    let votesRepositoryMock: jest.Mocked<VotesRepository>;
    let createVote: CreateVote;
    let vote: Vote | null = null;

    const id = new Id("vote-123");
    const yesterday = new Date(2025, 10, 1);
    const now = new Date(2025, 10, 2);
    const tomorrow = new Date(2025, 10, 3);
    const options = ["Option 1", "Option 2"];

    beforeEach(() => {
        idGeneratorMock = {
            generate: jest.fn().mockResolvedValue(id)
        };
        clockMock = {
            now: jest.fn().mockReturnValue(now)
        };
        votesRepositoryMock = {
            add: jest.fn()
        };
        createVote = new CreateVote(idGeneratorMock, clockMock, votesRepositoryMock);

        vote = null;
    });

    it("create a Vote with correct parameters", async () => {
        await whenCreatingVote();
        thenVoteIsCreated();
    });

    it("persist Vote with correct parameters", async () => {
        await whenCreatingVote();
        expect(votesRepositoryMock.add).toHaveBeenCalledWith(vote!);
    });

    it("propagate errors from idGenerator.generate", async () => {
        givenGenerateIdFails();
        const params = new CreateVoteParams("Error Title", options, tomorrow);
        await expect(createVote.call(params)).rejects.toBeInstanceOf(Error);
    });

    it("throw error when title is empty", async () => {
        const emptyTitle = "";
        const params = new CreateVoteParams(emptyTitle, options, tomorrow);
        await expect(createVote.call(params)).rejects.toBeInstanceOf(VoteTitleMustHaveAtLeastFiveCharactersException);
    });

    it("throw error when title has less than 5 characters", async () => {
        const shortTitle = "1234";
        const params = new CreateVoteParams(shortTitle, options, tomorrow);
        await expect(createVote.call(params)).rejects.toBeInstanceOf(VoteTitleMustHaveAtLeastFiveCharactersException);
    });

    it("throw error when has empty options", async () => {  
        const params = new CreateVoteParams("Empty Options", [], tomorrow);
        await expect(createVote.call(params)).rejects.toBeInstanceOf(VoteMustHaveAtLeastTwoOptionsException);
    });

    it("throw error when has just one option", async () => {  
        const params = new CreateVoteParams("Single Option", ["X"], tomorrow);
        await expect(createVote.call(params)).rejects.toBeInstanceOf(VoteMustHaveAtLeastTwoOptionsException);
    });

    it("throw error when endDate is in the past", async () => {
        const params = new CreateVoteParams("Past Vote", options, yesterday);
        await expect(createVote.call(params)).rejects.toBeInstanceOf(VoteEndDateInPastException);
    });

    function givenGenerateIdFails() {
        idGeneratorMock.generate.mockRejectedValue(new Error("ID error"));
    }

    async function whenCreatingVote() {
        const params = new CreateVoteParams("Test Title", options, tomorrow);
        vote = await createVote.call(params);
    }

    function thenVoteIsCreated() {
        expect(vote).toBeInstanceOf(Vote);
        expect(vote!.id).toBe(id);
        expect(vote!.title).toBe("Test Title");
        expect(vote!.endDate).toEqual(tomorrow);
        expect(idGeneratorMock.generate).toHaveBeenCalledTimes(1);
        expect(vote!.options).toEqual([new VoteOption(new Id("0"), "Option 1", 0), new VoteOption(new Id("1"), "Option 2", 1)]);
    }
});

