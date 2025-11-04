import { Id } from "../../models/id";
import { Vote } from "../../models/vote/vote";

export interface VotesRepository {
    add(vote: Vote): Promise<void>;
    findBy(voteId: Id): Promise<Vote | null>;
    update(vote: Vote): Promise<void>;
}