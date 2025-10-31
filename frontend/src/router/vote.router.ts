import { useRoute } from "vue-router";
import router from ".";

export class VoteRouter {
    static getVoteId(): string {
        const route = useRoute();
        return route.params.id as string;
    }

    static pushVoteDetails(voteId: string) {
        router.push({ name: 'VoteDetails', params: { id: voteId } });
    }
}