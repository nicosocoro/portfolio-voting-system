import { CastVote } from "../actions/castVote";
import { CreateVote } from "../actions/createVote";
import { FindVote } from "../actions/findVote";
import { RepositoriesFactory } from "./repositories.factory";
import { ServicesFactory } from "./services.factory";

export class ActionsFactory {
    static createVote(): CreateVote {
        return new CreateVote(ServicesFactory.createIdGenerator(), ServicesFactory.createClock(), RepositoriesFactory.getVotesRepository());
    }

    static createFindVote() {
        return new FindVote(RepositoriesFactory.getVotesRepository());
    }

    static createCastVote() {
        return new CastVote(RepositoriesFactory.getVotesRepository());
    }
}
