"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCommand = void 0;
class deleteCommand {
    constructor(manager, id) {
        this.manager = manager;
        this.id = id;
    }
    execute() {
        this.manager.delete(this.id);
    }
}
exports.deleteCommand = deleteCommand;
