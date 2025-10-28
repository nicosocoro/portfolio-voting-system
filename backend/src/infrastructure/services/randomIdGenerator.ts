import { Id } from "../../core/domain/models/id";
import { IdGenerator } from "../../core/domain/services/idGenerator";

export class RandomIdGenerator implements IdGenerator {
    async generate(): Promise<Id> {
        const { randomUUID } = require('crypto');
        const uniqueId = randomUUID();
        return new Id(uniqueId);
    }
}