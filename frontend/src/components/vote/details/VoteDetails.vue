<script setup>
import useGetVoteDetails from './VoteDetails.script';

const { vote, isLoading, findVote } = useGetVoteDetails();

findVote();
</script>

<template>
  <div v-if="!isLoading">
    Vote Details <h3>{{ vote.title }}</h3>
    Ends  <h4> {{ vote.endDate }}</h4>

    <label>Options</label>
    <div v-for="(option, index) in vote.options" :key="index" class="option-row">
      <h4> Option {{ index + 1 }}: {{ option.description }} </h4>
    </div>
  </div>
</template>
