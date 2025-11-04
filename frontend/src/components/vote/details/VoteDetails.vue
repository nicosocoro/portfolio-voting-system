<script setup>
import useGetVoteDetails from './VoteDetails.script';

const { vote, isLoading, timeLeft, findVote, castVote } = useGetVoteDetails();

findVote();
</script>

<template>
  <div class="w-8/10">
    <div v-if="!isLoading">
      <h2 class="font-sans font-bold">{{ vote.title }}</h2>

      <h3> Cuenta regresiva {{ timeLeft }}</h3>

      <label>Options</label>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="(option, index) in vote.options" @click.native="castVote(option.id)" :key="index" class="border-2 border-dashed p-4">
          <div class="overflow-hidden text-ellipsis">{{ option.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
