export class CreateVoteData {
  title: string;
  options: string[];
  endDate: Date;

  constructor(title: string, options: string[], endDate: Date) {
    this.title = title;
    this.options = options;
    this.endDate = endDate;
  }
}
