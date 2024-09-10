import { ExpenseRepository } from "../repository/expenseRepository";
import { Expense } from "../repository/types";
import { ExpenseResponder } from "./expenseResponder";
import { isValidNumber, isValidString } from "../lib/validators";

export class ExpenseManager {
  protected textMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  constructor(
    protected repo: ExpenseRepository,
    protected responder: ExpenseResponder
  ) {}

  add(description: string, amount: number): void {
    if (!isValidString(description) || !isValidNumber(amount)) {
      this.responder.output(`Not a valid description or amount`);
      return;
    }
    try {
      const saved = this.repo.create({
        description,
        amount,
      });
      this.responder.output(`Expense added successfully (ID: ${saved.id})`);
    } catch (err) {
      this.responder.output(
        `Database interaction failed: ${(err as Error).message}`
      );
    }
  }
  update(id: string, description?: string, amount?: number) {
    if (!isValidString(id)) {
      this.responder.output(`Not a valid id`);
    }
    if (description && !isValidString(description)) {
      this.responder.output(`Not a valid description`);
    }
    if (amount && !isValidNumber(amount)) {
      this.responder.output(`Not a valid amount`);
    }
    try {
      const result = this.repo.update({
        id,
        description,
        amount,
      });
      if (result) {
        this.responder.output(`Expense updated successfully`);
      } else {
        this.responder.output(`Expense update failed`);
      }
    } catch (err) {
      this.responder.output(
        `Database interaction failed: ${(err as Error).message}`
      );
    }
  }
  delete(id: string) {
    if (!isValidString(id)) {
      this.responder.output(`Not a valid id`);
    }
    try {
      const result = this.repo.delete(id);
      if (result) {
        this.responder.output(`Expense deleted successfully`);
      } else {
        this.responder.output(`Expense delete failed`);
      }
    } catch (err) {
      this.responder.output(
        `Database interaction failed: ${(err as Error).message}`
      );
    }
  }

  summary(month?: number) {
    if (month && (!isValidNumber(month) || !(month > 0 && month <= 12))) {
      this.responder.output(`Not a valid month`);
      return;
    }
    if (month) month = Math.floor(month);
    try {
      const amount = this.repo.getAmountSummary(month);
      if (month) {
        this.responder.output(
          `Total expenses for ${this.textMonth[month - 1]}: ${amount}`
        );
      } else {
        this.responder.output(`Total expenses: ${amount}`);
      }
    } catch (err) {
      this.responder.output(
        `Database interaction failed: ${(err as Error).message}`
      );
    }
  }
  list() {
    try {
      const records = this.repo.getAll();
      if (!records.length) {
        this.responder.output(`No records for now`);
      } else {
        this.responder.recordsWithHeader(records as Expense[]);
      }
    } catch (err) {
      this.responder.output(
        `Database interaction failed: ${(err as Error).message}`
      );
    }
  }
}
