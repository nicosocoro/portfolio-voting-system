import { FindVote } from "../../../core/actions/findVote";
import { Id } from "../../../core/domain/models/id";
import { Vote } from "../../../core/domain/models/vote/vote";
import { VotesRepository } from "../../../core/domain/repositories/vote/votesRepository";
import { VoteMother } from "../../mothers/vote.mother";

describe("find vote should", () => {
    let votesRepositoryMock: jest.Mocked<VotesRepository>;
    let findVote: FindVote;
    let vote: Vote | null = null;
    const voteId = new Id("1");

    beforeEach(() => {
        votesRepositoryMock = {
            add: jest.fn(),
            findBy: jest.fn(),
        };
        findVote = new FindVote(votesRepositoryMock);

        vote = null;
    });

    it("return a vote if it exists", async () => {
        givenExistingVote();
        await whenFindingVote();
        thenReturnExistingVote();
    });

    it("return null if the vote does not exist", async () => {
        givenAnotherExistingVote();
        await whenFindingVote();
        thenNoVoteIsReturned();
    });

    function givenExistingVote() {
        votesRepositoryMock.findBy = jest.fn().mockResolvedValue(VoteMother.aVote(voteId.getId()));
    }

    function givenAnotherExistingVote() {
        votesRepositoryMock.findBy.mockImplementation(async (id: Id) => {
            if (id.getId() === "not existing vote") {
                return VoteMother.aVote("not existing vote");
            }
            return null;
        });
    }

    async function whenFindingVote() {
        vote = await findVote.call(voteId);
    }

    function thenReturnExistingVote() {
        expect(vote).toEqual(VoteMother.aVote(voteId.getId()));
    }

    function thenNoVoteIsReturned() {
        expect(vote).toBeNull();
    }
});
