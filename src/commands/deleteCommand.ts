import { ExpenseManager } from "../core/expenseManager";
import { ICommand } from "../types";

export class deleteCommand implements ICommand {
  constructor(protected manager: ExpenseManager, protected id: string) {}
  execute(): void {
    this.manager.delete(this.id);
  }
}
