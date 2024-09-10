import { ExpenseManager } from "../core/expenseManager";
import { ICommand } from "../types";

export class listCommand implements ICommand {
  constructor(protected manager: ExpenseManager) {}
  execute(): void {
    this.manager.list();
  }
}
