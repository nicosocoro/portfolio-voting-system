import { InMemoryVotesRepository } from "../../infrastructure/repositories/vote/inMemoryVotesRepository";
import { VotesRepository } from "../domain/repositories/vote/votesRepository";

export class RepositoriesFactory {
    private static votesRepository: VotesRepository | null = null;

    static getVotesRepository(): VotesRepository {
        if (!this.votesRepository) {
            this.votesRepository = new InMemoryVotesRepository();
        }
        return this.votesRepository;
    }
}
