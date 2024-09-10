import { Command } from "commander";
import { ExpenseRepository } from "./repository/expenseRepository";
import { CommandInvoker } from "./core/commandInvoker";
import { ExpenseManager } from "./core/expenseManager";
import { ExpenseResponder } from "./core/expenseResponder";
import { listCommand } from "./commands/listCommand";
import { addCommand } from "./commands/addCommand";
import { deleteCommand } from "./commands/deleteCommand";
import { updateCommand } from "./commands/updateCommand";
import { summaryCommand } from "./commands/summaryCommand";

const repo = new ExpenseRepository("./expense-storage");
const invoker = new CommandInvoker();
const responder = new ExpenseResponder();
const manager = new ExpenseManager(repo, responder);

const program = new Command();

program
  .command("list")
  .description(`List all records`)
  .action(() => {
    invoker.addCommand(new listCommand(manager));
    invoker.process();
  });

program
  .command("add")
  .description("Add new expense with description and amount")
  .option("--description <description>", "description")
  .option("--amount <amount>", "spent amount")
  .action((options) => {
    invoker.addCommand(
      new addCommand(manager, options.description, options.amount)
    );
    invoker.process();
  });

program
  .command("delete")
  .description("Delete record using id")
  .option("--id <id>", "id of the record")
  .action((options) => {
    invoker.addCommand(new deleteCommand(manager, options.id));
    invoker.process();
  });

program
  .command("update")
  .description("Update description and amount for the record with ID")
  .option("--id <id>", "id of the record")
  .option("--description <description>", "description")
  .option("--amount <amount>", "spent amount")
  .action((options) => {
    invoker.addCommand(
      new updateCommand(
        manager,
        options.id,
        options.description,
        options.amount
      )
    );
    invoker.process();
  });

program
  .command("summary")
  .description("Get a summary of expenses; all or for a specific month")
  .option("--month <month>", "summary for the specific month")
  .action((options) => {
    invoker.addCommand(new summaryCommand(manager, options.month));
    invoker.process();
  });

program.parse();
