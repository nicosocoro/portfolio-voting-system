import router from ".";

export class VoteRouter {
    static pushVoteDetails(voteId: string) {
        router.push({ name: 'VoteDetails', params: { id: voteId } });
    }
}