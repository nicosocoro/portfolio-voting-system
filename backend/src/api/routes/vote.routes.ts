import { FastifyInstance } from "fastify";
import { CastVoteSchema, CreateVoteSchema } from "../schemas/vote.schemas";
import { ControllersFactory } from "../controllers/controllers.factory";

export default async function (fastify: FastifyInstance) {
  const controller = ControllersFactory.createVoteController();

  fastify.post("/api/votes", { schema: CreateVoteSchema }, controller.createVoteHandler.bind(controller));
  fastify.post("/api/votes/:id/cast", { schema: CastVoteSchema }, controller.castVoteHandler.bind(controller));
  fastify.get("/api/votes/:id", controller.findVoteHandler.bind(controller));
}