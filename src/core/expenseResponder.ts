import { IResponder } from "../types";
import { Expense } from "../repository/types";

export class ExpenseResponder implements IResponder {
  output(text: string): void {
    console.log(text);
  }
  recordsWithHeader(records: Expense[]): void {
    this.output(`ID\tDate\tDescription\tAmount`);
    records.forEach((r) =>
      this.output(
        `${r.id}\t${new Date(r.createdAt).toDateString()}\t${r.description}\t${
          r.amount
        }`
      )
    );
  }
}
