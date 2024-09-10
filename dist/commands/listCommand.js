"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCommand = void 0;
class listCommand {
    constructor(manager) {
        this.manager = manager;
    }
    execute() {
        this.manager.list();
    }
}
exports.listCommand = listCommand;
