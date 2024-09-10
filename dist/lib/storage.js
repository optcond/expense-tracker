"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONStorage = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
class JSONStorage {
    constructor(path) {
        this.path = path;
        if (!fs_1.default.existsSync(this.path)) {
            fs_1.default.writeFileSync(this.path, JSON.stringify([]));
        }
    }
    _readStorageFile() {
        return JSON.parse(fs_1.default.readFileSync(this.path).toString());
    }
    _saveStorageFile(data) {
        fs_1.default.writeFileSync(this.path, JSON.stringify(data));
    }
    create(entity) {
        const entityWithId = Object.assign(Object.assign({}, entity), { id: (0, uuid_1.v4)(), createdAt: new Date().toISOString() });
        const data = this._readStorageFile();
        data.push(entityWithId);
        this._saveStorageFile(data);
        return entityWithId;
    }
    delete(id) {
        const data = this._readStorageFile();
        const index = data.findIndex((ent) => ent.id === id);
        if (index === -1)
            return false;
        data.splice(index, 1);
        this._saveStorageFile(data);
        return true;
    }
    get(id) {
        const data = this._readStorageFile();
        const found = data.findIndex((ent) => ent.id === id);
        if (found === -1)
            return null;
        return data[found];
    }
    getAll() {
        return this._readStorageFile();
    }
    update(entity) {
        if (!entity.id)
            return false;
        const data = this._readStorageFile();
        const found = data.findIndex((ent) => ent.id === entity.id);
        if (found === -1)
            return false;
        const reduced = Object.keys(entity)
            .filter((key) => entity[key] !== undefined)
            .reduce((accumulator, key) => {
            accumulator[key] = entity[key];
            return accumulator;
        }, {});
        data[found] = Object.assign(Object.assign({}, data[found]), reduced);
        this._saveStorageFile(data);
        return true;
    }
}
exports.JSONStorage = JSONStorage;
