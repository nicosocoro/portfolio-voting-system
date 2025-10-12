import { Id } from "../../core/domain/models/id";
import { Vote } from "../../core/domain/models/vote/vote";
import { VoteOption } from "../../core/domain/models/vote/voteOption";
import { ClockMother } from "./clock.mother";

export class VoteMother {
    static aVote(id: string): Vote {
        return new Vote(new Id(id), "Sample Vote", [this.anOptionWithOrder(0), this.anOptionWithOrder(1)], ClockMother.now, ClockMother.tomorrow);
    }

    static anOptionWithOrder(order: number): VoteOption {
        return new VoteOption(new Id(order.toString()), `Option ${order}`, order);
    }
}