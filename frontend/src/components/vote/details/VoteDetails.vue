<script setup>
import useGetVoteDetails from './VoteDetails.script';

const { vote, isLoading, findVote } = useGetVoteDetails();

findVote();
</script>

<template>
  <div v-if="!isLoading">
    Vote Details <h3>{{ vote.title }}</h3>
    Ends <h4> {{ vote.endDate }}</h4>

    <label>Options</label>
    <div class="grid grid-cols-2 gap-4">
      <div v-for="(option, index) in vote.options" :key="index" class="border-2 border-dashed p-4">
        <div>{{ option.description }}</div>
      </div>
    </div>
  </div>
</template>
