"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommand = void 0;
class addCommand {
    constructor(manager, description, amount) {
        this.manager = manager;
        this.description = description;
        this.amount = amount;
    }
    execute() {
        this.manager.add(this.description, parseInt(this.amount));
    }
}
exports.addCommand = addCommand;
