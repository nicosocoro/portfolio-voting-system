import { CastVote, CastVoteParams } from "../../core/actions/castVote";
import { CreateVote, CreateVoteParams } from "../../core/actions/createVote";
import { FindVote } from "../../core/actions/findVote";
import { Id } from "../../core/domain/models/id";
import { Vote } from "../../core/domain/models/vote/vote";
import { VoteOption } from "../../core/domain/models/vote/voteOption";
import { CastVoteSchema, CreateVoteSchema } from "../schemas/vote.schemas";
import { Static } from "@sinclair/typebox";
import { FastifyRequest, FastifyReply } from "fastify";

export type CreateVoteBody = Static<typeof CreateVoteSchema.body>;
export type CastVoteBody = Static<typeof CastVoteSchema.body>;

export class VoteController {
    private createVote: CreateVote;
    private findVote: FindVote;
    private castVote: CastVote;

    constructor(createVote: CreateVote, findVote: FindVote, castVote: CastVote) {
        this.createVote = createVote;
        this.findVote = findVote;
        this.castVote = castVote;
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

        reply.code(201).send(this.voteToJson(vote));
    }

    async findVoteHandler(
        request: FastifyRequest,
        reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const vote = await this.findVote.call(new Id(id));

        if (!vote) {
            reply.code(404).send({ message: "Vote not found" });
            return;
        }

        reply.code(200).send(this.voteToJson(vote));
    }

    async castVoteHandler(
        request: FastifyRequest<{ Body: CastVoteBody }>,
        reply: FastifyReply
    ) {
        const { id } = request.params as { id: string };
        const { optionId } = request.body;

        const vote = await this.castVote.call(new CastVoteParams(
            id,
            optionId
        ));

        reply.code(200).send(this.voteToJson(vote));
    }

    private voteToJson(vote: Vote) {
        return {
            id: vote.id.getId(),
            title: vote.title,
            options: this.optionsToJson(vote.options),
            endDateInMillis: vote.endDate.getTime(),
        };
    }

    private optionsToJson(options: VoteOption[]) {
        return options.map(option => ({
            id: option.id.getId(),
            description: option.description,
            order: option.order,
            votesCount: option.votesCount,
        }));
    }
}