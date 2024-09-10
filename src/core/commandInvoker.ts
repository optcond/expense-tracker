import { ICommand } from "../types";

export class CommandInvoker {
  private commands: ICommand[] = [];

  addCommand(command: ICommand) {
    this.commands.push(command);
  }

  process() {
    for (let command of this.commands) {
      command.execute();
    }
  }
}
