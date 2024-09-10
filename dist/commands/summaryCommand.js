"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summaryCommand = void 0;
class summaryCommand {
    constructor(manager, month) {
        this.manager = manager;
        this.month = month;
    }
    execute() {
        this.manager.summary(this.month ? parseInt(this.month) : undefined);
    }
}
exports.summaryCommand = summaryCommand;
