import { Clock } from "../../core/domain/services/clock";

export class SystemClock implements Clock {
    now(): Date {
        return new Date();
    }
}