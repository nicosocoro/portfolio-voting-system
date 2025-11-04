import { ActionsFactory } from "../../core/factory/actions.factory";
import { VoteController } from "./vote.controller";

export class ControllersFactory {
    static createVoteController(): VoteController {
        return new VoteController(ActionsFactory.createVote(), ActionsFactory.createFindVote(), ActionsFactory.createCastVote());
    }
}