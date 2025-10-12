import { Id } from "../models/id";

export interface IdGenerator {
    generate(): Promise<Id>;
}