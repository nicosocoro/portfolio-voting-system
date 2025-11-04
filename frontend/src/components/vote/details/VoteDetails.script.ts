import { ref, computed, onMounted, onUnmounted, type Ref } from 'vue'
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
    await voteService.castVote(voteId.value, optionId);
    isVoting.value = false;
  };



const now = ref(new Date())

let interval: number

onMounted(() => {
  interval = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

const timeLeft = computed(() => {
  const end = new Date(vote.value!!.endDate).getTime()
  const diff = end - now.value.getTime()
  if (diff <= 0) return null

  const seconds = Math.floor((diff / 1000) % 60)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24)
  const days = Math.floor(diff / 1000 / 60 / 60 / 24)

  return `${days}d ${hours}h ${minutes}m ${seconds}s`
})



  return {
    isLoading,
    vote,
    timeLeft,
    findVote,
    castVote,
  };
}