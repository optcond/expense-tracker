"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseResponder = void 0;
class ExpenseResponder {
    output(text) {
        console.log(text);
    }
    recordsWithHeader(records) {
        this.output(`ID\tDate\tDescription\tAmount`);
        records.forEach((r) => this.output(`${r.id}\t${new Date(r.createdAt).toDateString()}\t${r.description}\t${r.amount}`));
    }
}
exports.ExpenseResponder = ExpenseResponder;
