import { InMemoryVotesRepository } from "../../infrastructure/repositories/vote/inMemoryVotesRepository";
import { VotesRepository } from "../domain/repositories/vote/votesRepository";

export class RepositoriesFactory {
    static createVotesRepository(): VotesRepository {
        return new InMemoryVotesRepository();
    }
}
