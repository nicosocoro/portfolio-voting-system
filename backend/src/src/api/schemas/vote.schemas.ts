import { Type } from "@sinclair/typebox";

export const CreateVoteSchema = {
  body: Type.Object({
    title: Type.String(),
    options: Type.Array(Type.String({ minLength: 2 })),
    endDate: Type.Optional(Type.Number({ minimum: 0 })), // Unix timestamp in milliseconds
  }),
};