import { FastifyReply, FastifyRequest } from "fastify";
import { CreateVote } from "../../core/actions/createVote";

export class VoteController {
    private createVote: CreateVote

    constructor(createVote: CreateVote) {
        console.log(`createVote: ${createVote}`);
        this.createVote = createVote;
    }

    async createVoteHandler(
        request: FastifyRequest<{ Body: { title: string; options: string[]; endDate: number } }>,
        reply: FastifyReply
    ) {
        // const { title, options, endDate } = request.body;

        const vote = await this.createVote.call();

        reply.code(201).send({
            id: vote.id,
            title: vote.title,
            options: vote.options,
            endDate: vote.endDate.getTime(),
        });
    }
}