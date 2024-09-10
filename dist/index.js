"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const expenseRepository_1 = require("./repository/expenseRepository");
const commandInvoker_1 = require("./lib/commandInvoker");
const expenseManager_1 = require("./lib/expenseManager");
const responder_1 = require("./lib/responder");
const listCommand_1 = require("./commands/listCommand");
const addCommand_1 = require("./commands/addCommand");
const deleteCommand_1 = require("./commands/deleteCommand");
const updateCommand_1 = require("./commands/updateCommand");
const summaryCommand_1 = require("./commands/summaryCommand");
const repo = new expenseRepository_1.ExpenseRepository("./expense-storage");
const invoker = new commandInvoker_1.CommandInvoker();
const responder = new responder_1.ExpenseResponder();
const manager = new expenseManager_1.ExpenseManager(repo, responder);
const program = new commander_1.Command();
program
    .command("list")
    .description(`List all records`)
    .action(() => {
    invoker.addCommand(new listCommand_1.listCommand(manager));
    invoker.process();
});
program
    .command("add")
    .description("Add new expense with description and amount")
    .option("--description <description>", "description")
    .option("--amount <amount>", "spent amount")
    .action((options) => {
    invoker.addCommand(new addCommand_1.addCommand(manager, options.description, options.amount));
    invoker.process();
});
program
    .command("delete")
    .description("Delete record using id")
    .option("--id <id>", "id of the record")
    .action((options) => {
    invoker.addCommand(new deleteCommand_1.deleteCommand(manager, options.id));
    invoker.process();
});
program
    .command("update")
    .description("Update description and amount for the record with ID")
    .option("--id <id>", "id of the record")
    .option("--description <description>", "description")
    .option("--amount <amount>", "spent amount")
    .action((options) => {
    invoker.addCommand(new updateCommand_1.updateCommand(manager, options.id, options.description, options.amount));
    invoker.process();
});
program
    .command("summary")
    .description("Get a summary of expenses; all or for a specific month")
    .option("--month <month>", "summary for the specific month")
    .action((options) => {
    invoker.addCommand(new summaryCommand_1.summaryCommand(manager, options.month));
    invoker.process();
});
program.parse();
