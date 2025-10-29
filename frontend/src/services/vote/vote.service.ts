import axios from 'axios';
import { CreateVoteData } from '../../models/vote/createVote.data'

export const voteService = {
    async send(data: CreateVoteData) {
        const json = _toJson(data);
        return axios.post('http://localhost:3000/api/votes', json);
    }
}

const _toJson = (data: CreateVoteData) => {
    return {
        title: data.title,
        options: data.options,
        endDateInMillis: data.endDate.getTime(),
    }
}