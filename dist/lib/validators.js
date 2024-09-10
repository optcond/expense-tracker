"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidString = isValidString;
exports.isValidNumber = isValidNumber;
function isValidString(data) {
    return typeof data === "string" && data.trim().length > 0 ? true : false;
}
function isValidNumber(data) {
    return typeof data === "number" && Number.isFinite(data) ? true : false;
}
