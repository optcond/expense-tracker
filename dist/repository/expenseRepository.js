"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseRepository = void 0;
const storage_1 = require("../lib/storage");
class ExpenseRepository extends storage_1.JSONStorage {
    getAmountSummary(filterMonth) {
        const data = this.getAll();
        const month = filterMonth !== null && filterMonth !== void 0 ? filterMonth : 0;
        const amount = data.reduce((totalAmount, expense) => {
            if (expense.amount) {
                if (month === 0 ||
                    (expense.createdAt &&
                        new Date(expense.createdAt).getMonth() === month - 1 &&
                        new Date(expense.createdAt).getFullYear() ===
                            new Date().getFullYear()))
                    totalAmount += expense.amount;
            }
            return totalAmount;
        }, 0);
        return amount;
    }
}
exports.ExpenseRepository = ExpenseRepository;
