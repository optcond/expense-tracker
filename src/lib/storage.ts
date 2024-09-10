import fs from "fs";
import { IStorage } from "../types";
import { v4 as uuidv4 } from "uuid";

export class JSONStorage<T extends { id?: string }> implements IStorage<T> {
  constructor(protected path: string) {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }
  _readStorageFile(): Partial<T>[] {
    return JSON.parse(fs.readFileSync(this.path).toString());
  }
  _saveStorageFile(data: Partial<T>[]): void {
    fs.writeFileSync(this.path, JSON.stringify(data));
  }
  create(entity: Partial<T>): Partial<T> & { id: string } {
    const entityWithId = {
      ...entity,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    const data = this._readStorageFile();
    data.push(entityWithId);
    this._saveStorageFile(data);

    return entityWithId;
  }
  delete(id: string): boolean {
    const data = this._readStorageFile();
    const index = data.findIndex((ent) => ent.id === id);
    if (index === -1) return false;

    data.splice(index, 1);
    this._saveStorageFile(data);
    return true;
  }
  get(id: string): Partial<T> | null {
    const data = this._readStorageFile();
    const found = data.findIndex((ent) => ent.id === id);
    if (found === -1) return null;
    return data[found];
  }
  getAll(): Partial<T>[] {
    return this._readStorageFile();
  }
  update(entity: Partial<T>): boolean {
    if (!entity.id) return false;
    const data = this._readStorageFile();
    const found = data.findIndex((ent) => ent.id === entity.id);
    if (found === -1) return false;

    const reduced = (Object.keys(entity) as (keyof T)[])
      .filter((key) => entity[key] !== undefined)
      .reduce((accumulator, key) => {
        accumulator[key] = entity[key];
        return accumulator;
      }, {} as Partial<T>);

    data[found] = {
      ...data[found],
      ...reduced,
    };
    this._saveStorageFile(data);
    return true;
  }
}
