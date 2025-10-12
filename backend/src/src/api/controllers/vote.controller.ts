import { CreateVote, CreateVoteParams } from "../../core/actions/createVote";
import { VoteOption } from "../../core/domain/models/vote/voteOption";
import { CreateVoteSchema } from "../schemas/vote.schemas";
import { Static } from "@sinclair/typebox";
import { FastifyRequest, FastifyReply } from "fastify";

// Define the type for the request body based on the schema
export type CreateVoteBody = Static<typeof CreateVoteSchema.body>;

export class VoteController {
    private createVote: CreateVote;

    constructor(createVote: CreateVote) {
        console.log(`createVote: ${createVote}`);
        this.createVote = createVote;
    }

    async createVoteHandler(
        request: FastifyRequest<{ Body: CreateVoteBody }>,
        reply: FastifyReply
    ) {
        const { title, options, endDateInMillis: endDateInMillis } = request.body;

        const vote = await this.createVote.call(new CreateVoteParams(
            title,
            options,
            new Date(endDateInMillis),
        ));

        reply.code(201).send({
            id: vote.id.getId(),
            title: vote.title,
            options: this.mapOptionsToJson(vote.options),
            endDate: vote.endDate.getTime(),
        });
    }

    private mapOptionsToJson(options: VoteOption[]) {
        return options.map(option => ({
            id: option.id.getId(),
            description: option.description,
            order: option.order,
        }));
    }
}