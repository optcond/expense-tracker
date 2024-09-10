import { ExpenseManager } from "../core/expenseManager";
import { ICommand } from "../types";

export class addCommand implements ICommand {
  constructor(
    protected manager: ExpenseManager,
    protected description: string,
    protected amount: string
  ) {}
  execute(): void {
    this.manager.add(this.description, parseInt(this.amount));
  }
}
