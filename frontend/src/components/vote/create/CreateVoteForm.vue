<script setup lang="ts">
import useCreateVoteForm from './CreateVoteForm.script.ts';

const { form, errors, today, addOption, handleSubmit } = useCreateVoteForm();

</script>

<style src="./CreateVoteForm.styles.css" scoped></style>

<template>
  <div class="create-vote-form">
    <header>
      <h1>Create a New Vote</h1>
      <p>Fill out the form below to create a new vote.</p>
    </header>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Title</label>
        <input id="title" v-model="form.title" type="text" placeholder="Enter vote title" required />
        <span v-if="errors.title" class="error">{{ errors.title }}</span>
      </div>

      <div class="form-group">
        <label>Options</label>
        <div v-for="(option, index) in form.options" :key="index" class="option-row">
          <input v-model="form.options[index]" type="text" placeholder="Enter option" required />
        </div>
        <button type="button" @click="addOption">+ Add Option</button>
        <span v-if="errors.options" class="error">{{ errors.options }}</span>
      </div>

      <div class="form-group">
        <label for="endDate">End Date</label>
        <input id="endDate" v-model="form.endDate" type="date" :min="today" required />
        <span v-if="errors.endDate" class="error">{{ errors.endDate }}</span>
      </div>

      <button type="submit">Create Vote</button>
    </form>
  </div>
</template>