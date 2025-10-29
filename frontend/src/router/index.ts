import { createRouter, createWebHistory } from 'vue-router';
import CreateVoteForm from '../components/vote/create/CreateVoteForm.vue';
import VoteDetails from '../components/vote/details/VoteDetails.vue';

const routes = [
     { path: '/', name: 'Home', component: CreateVoteForm },
    { path: '/votes/:id', name: 'VoteDetails', component: VoteDetails },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;