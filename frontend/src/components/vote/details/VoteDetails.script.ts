import { ref, type Ref } from 'vue';
import { VoteRouter } from '../../../router/vote.router';
import { voteService } from '../../../services/vote/vote.service';
import type { Vote } from '../../../models/vote/vote';

export default function useGetVoteDetails() {
  const voteId = ref(VoteRouter.getVoteId());

  const vote: Ref<Vote | null> = ref(null);
  const isLoading = ref(true);
  const isVoting = ref(false);
  
  const findVote = async () => {
    vote.value = await voteService.findVote(voteId.value);
    isLoading.value = false;
  };

  const castVote = async (optionId: string) => {
    if (isVoting.value) return;

    isVoting.value = true;
    // await voteService.castVote(voteId.value, optionId);
    isVoting.value = false;
  };

  return {
    isLoading,
    vote,
    findVote,
    castVote,
  };
}