"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandInvoker = void 0;
class CommandInvoker {
    constructor() {
        this.commands = [];
    }
    addCommand(command) {
        this.commands.push(command);
    }
    process() {
        for (let command of this.commands) {
            command.execute();
        }
    }
}
exports.CommandInvoker = CommandInvoker;
