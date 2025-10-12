import { CreateVote, CreateVoteParams } from "../../../core/actions/createVote";
import { VoteTitleMustHaveAtLeastFiveCharactersException, VoteEndDateInPastException, VoteMustHaveAtLeastTwoOptionsException } from "../../../core/domain/exceptions/vote.exceptions";
import { Id } from "../../../core/domain/models/id";
import { Vote } from "../../../core/domain/models/vote/vote";
import { VoteOption } from "../../../core/domain/models/vote/voteOption";
import { VotesRepository } from "../../../core/domain/repositories/vote/votesRepository";
import { Clock } from "../../../core/domain/services/clock";
import { IdGenerator } from "../../../core/domain/services/idGenerator";
import { ClockMother } from "../../mothers/clock.mother";
import { VoteMother } from "../../mothers/vote.mother";

describe("CreateVote should", () => {
    let idGeneratorMock: jest.Mocked<IdGenerator>;
    let clockMock: jest.Mocked<Clock>;  
    let votesRepositoryMock: jest.Mocked<VotesRepository>;
    let createVote: CreateVote;
    let vote: Vote | null = null;

    const id = new Id("vote-123");
    const options = ["Option 0", "Option 1"];

    beforeEach(() => {
        idGeneratorMock = {
            generate: jest.fn().mockResolvedValue(id)
        };
        clockMock = {
            now: jest.fn().mockReturnValue(ClockMother.now)
        };
        votesRepositoryMock = {
            add: jest.fn(),
            findBy: jest.fn(),
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
        const params = new CreateVoteParams("Error Title", options, ClockMother.tomorrow);
        await expect(createVote.call(params)).rejects.toBeInstanceOf(Error);
    });

    it("throw error when title is empty", async () => {
        const emptyTitle = "";
        const params = new CreateVoteParams(emptyTitle, options, ClockMother.tomorrow);
        await expect(createVote.call(params)).rejects.toBeInstanceOf(VoteTitleMustHaveAtLeastFiveCharactersException);
    });

    it("throw error when title has less than 5 characters", async () => {
        const shortTitle = "1234";
        const params = new CreateVoteParams(shortTitle, options, ClockMother.tomorrow);
        await expect(createVote.call(params)).rejects.toBeInstanceOf(VoteTitleMustHaveAtLeastFiveCharactersException);
    });

    it("throw error when has empty options", async () => {  
        const params = new CreateVoteParams("Empty Options", [], ClockMother.tomorrow);
        await expect(createVote.call(params)).rejects.toBeInstanceOf(VoteMustHaveAtLeastTwoOptionsException);
    });

    it("throw error when has just one option", async () => {  
        const params = new CreateVoteParams("Single Option", ["X"], ClockMother.tomorrow);
        await expect(createVote.call(params)).rejects.toBeInstanceOf(VoteMustHaveAtLeastTwoOptionsException);
    });

    it("throw error when endDate is in the past", async () => {
        const params = new CreateVoteParams("Past Vote", options, ClockMother.yesterday);
        await expect(createVote.call(params)).rejects.toBeInstanceOf(VoteEndDateInPastException);
    });

    function givenGenerateIdFails() {
        idGeneratorMock.generate.mockRejectedValue(new Error("ID error"));
    }

    async function whenCreatingVote() {
        const params = new CreateVoteParams("Test Title", options, ClockMother.tomorrow);
        vote = await createVote.call(params);
    }

    function thenVoteIsCreated() {
        expect(vote).toBeInstanceOf(Vote);
        expect(vote!.id).toBe(id);
        expect(vote!.title).toBe("Test Title");
        expect(vote!.endDate).toEqual(ClockMother.tomorrow);
        expect(idGeneratorMock.generate).toHaveBeenCalledTimes(1);
        expect(vote!.options).toEqual([VoteMother.anOptionWithOrder(0), VoteMother.anOptionWithOrder(1)]);
    }
});

