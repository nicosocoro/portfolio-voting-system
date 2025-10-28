export class Id {
    private $value: string;

    constructor(value: string) {
        this.$value = value;
    }

    getId(): string {
        return this.$value;
    }
}