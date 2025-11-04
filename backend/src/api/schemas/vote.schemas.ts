import { Type } from "@sinclair/typebox";

export const CreateVoteSchema = {
  body: Type.Object({
    title: Type.String(),
    options: Type.Array(Type.String({ minLength: 2 })),
    endDateInMillis: Type.Number({ minimum: 0 }), // Unix timestamp in milliseconds
  }),
};

export const CastVoteSchema = {
  body: Type.Object({
    optionId: Type.String(),
  }),
};