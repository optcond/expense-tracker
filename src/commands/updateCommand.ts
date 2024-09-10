import { ExpenseManager } from "../core/expenseManager";
import { ICommand } from "../types";

export class updateCommand implements ICommand {
  constructor(
    protected manager: ExpenseManager,
    protected id: string,
    protected description?: string,
    protected amount?: string
  ) {}
  execute(): void {
    this.manager.update(this.id, this.description, Number(this.amount));
  }
}
