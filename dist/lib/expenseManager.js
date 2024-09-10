"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseManager = void 0;
const validators_1 = require("./validators");
class ExpenseManager {
    constructor(repo, responder) {
        this.repo = repo;
        this.responder = responder;
        this.textMonth = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
    }
    add(description, amount) {
        if (!(0, validators_1.isValidString)(description) || !(0, validators_1.isValidNumber)(amount)) {
            this.responder.output(`Not a valid description or amount`);
            return;
        }
        try {
            const saved = this.repo.create({
                description,
                amount,
            });
            this.responder.output(`Expense added successfully (ID: ${saved.id})`);
        }
        catch (err) {
            this.responder.output(`Database interaction failed: ${err.message}`);
        }
    }
    update(id, description, amount) {
        if (!(0, validators_1.isValidString)(id)) {
            this.responder.output(`Not a valid id`);
        }
        if (description && !(0, validators_1.isValidString)(description)) {
            this.responder.output(`Not a valid description`);
        }
        if (amount && !(0, validators_1.isValidNumber)(amount)) {
            this.responder.output(`Not a valid amount`);
        }
        try {
            const result = this.repo.update({
                id,
                description,
                amount,
            });
            if (result) {
                this.responder.output(`Expense updated successfully`);
            }
            else {
                this.responder.output(`Expense update failed`);
            }
        }
        catch (err) {
            this.responder.output(`Database interaction failed: ${err.message}`);
        }
    }
    delete(id) {
        if (!(0, validators_1.isValidString)(id)) {
            this.responder.output(`Not a valid id`);
        }
        try {
            const result = this.repo.delete(id);
            if (result) {
                this.responder.output(`Expense deleted successfully`);
            }
            else {
                this.responder.output(`Expense delete failed`);
            }
        }
        catch (err) {
            this.responder.output(`Database interaction failed: ${err.message}`);
        }
    }
    summary(month) {
        if (month && (!(0, validators_1.isValidNumber)(month) || !(month > 0 && month <= 12))) {
            this.responder.output(`Not a valid month`);
            return;
        }
        if (month)
            month = Math.floor(month);
        try {
            const amount = this.repo.getAmountSummary(month);
            if (month) {
                this.responder.output(`Total expenses for ${this.textMonth[month - 1]}: ${amount}`);
            }
            else {
                this.responder.output(`Total expenses: ${amount}`);
            }
        }
        catch (err) {
            this.responder.output(`Database interaction failed: ${err.message}`);
        }
    }
    list() {
        try {
            const records = this.repo.getAll();
            if (!records.length) {
                this.responder.output(`No records for now`);
            }
            else {
                this.responder.recordsWithHeader(records);
            }
        }
        catch (err) {
            this.responder.output(`Database interaction failed: ${err.message}`);
        }
    }
}
exports.ExpenseManager = ExpenseManager;
