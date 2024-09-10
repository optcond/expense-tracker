import { ExpenseManager } from "../core/expenseManager";
import { ICommand } from "../types";

export class summaryCommand implements ICommand {
  constructor(protected manager: ExpenseManager, protected month?: string) {}
  execute(): void {
    this.manager.summary(this.month ? parseInt(this.month) : undefined);
  }
}
