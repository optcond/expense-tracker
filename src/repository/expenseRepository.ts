import { JSONStorage } from "../lib/storage";
import { Expense } from "./types";

export class ExpenseRepository extends JSONStorage<Expense> {
  getAmountSummary(filterMonth?: number): number {
    const data = this.getAll();
    const month = filterMonth ?? 0;
    const amount = data.reduce((totalAmount, expense) => {
      if (expense.amount) {
        if (
          month === 0 ||
          (expense.createdAt &&
            new Date(expense.createdAt).getMonth() === month - 1 &&
            new Date(expense.createdAt).getFullYear() ===
              new Date().getFullYear())
        )
          totalAmount += expense.amount;
      }
      return totalAmount;
    }, 0);
    return amount;
  }
}
