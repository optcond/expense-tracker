"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommand = void 0;
class updateCommand {
    constructor(manager, id, description, amount) {
        this.manager = manager;
        this.id = id;
        this.description = description;
        this.amount = amount;
    }
    execute() {
        this.manager.update(this.id, this.description, Number(this.amount));
    }
}
exports.updateCommand = updateCommand;
