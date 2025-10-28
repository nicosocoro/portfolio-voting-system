
import { RandomIdGenerator } from "../../infrastructure/services/randomIdGenerator";
import { SystemClock } from "../../infrastructure/services/systemClock";
import { Clock } from "../domain/services/clock";
import { IdGenerator } from "../domain/services/idGenerator";

export class ServicesFactory {
    static createIdGenerator(): IdGenerator {
        return new RandomIdGenerator();
    }

    static createClock(): Clock {
        return new SystemClock();
    }
}