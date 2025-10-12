import { Vote } from "../../models/vote/vote";

export interface VotesRepository {
    add(vote: Vote): Promise<void>;
}