import { CreateVote } from "../actions/createVote";
import { RepositoriesFactory } from "./repositories.factory";
import { ServicesFactory } from "./services.factory";

export class ActionsFactory {
    static createVote(): CreateVote {
        return new CreateVote(ServicesFactory.createIdGenerator(), ServicesFactory.createClock(), RepositoriesFactory.createVotesRepository());
    }
}
