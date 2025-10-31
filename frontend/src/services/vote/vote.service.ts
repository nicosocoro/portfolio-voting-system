import axios from 'axios';
import { CreateVoteData } from '../../models/vote/createVote.data'
import { Vote } from '../../models/vote/vote';

export const voteService = {
    async createVote(data: CreateVoteData): Promise<Vote> {
        const voteJson = await _create(data);
        return _toDomain(voteJson);
    },

    async findVote(id: string): Promise<Vote | null> {
        const voteJson = await _find(id); // TODO: Cache
        return _toDomain(voteJson);
    }
}

function _toDomain(voteJson: any): Vote | PromiseLike<Vote> {
    return new Vote(voteJson.id, voteJson.title, voteJson.options, new Date(voteJson.endDateInMillis));
}

async function _create(data: CreateVoteData): Promise<any> {
    const json = _toJson(data);
    const response = await axios.post('http://localhost:3000/api/votes', json);
    return response.data;
}

async function _find(id: string): Promise<any> {
    const response = await axios.get(`http://localhost:3000/api/votes/${id}`);
    return response.data;
}

const _toJson = (data: CreateVoteData) => {
    return {
        title: data.title,
        options: data.options,
        endDateInMillis: data.endDate.getTime(),
    }
}
