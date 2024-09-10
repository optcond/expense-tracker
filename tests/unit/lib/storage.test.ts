import { JSONStorage } from "../../../src/lib/storage";
import fs from "fs";

interface GenericEntity {
  id?: string;
  value1: string;
  value2: number;
  value3?: string;
}

describe(`JSON storage implementation of CRUD`, () => {
  const storageName = "tasks-storage";
  let storage: JSONStorage<GenericEntity>;
  beforeEach(() => {
    storage = new JSONStorage(storageName);
  });
  afterEach(() => {
    fs.unlinkSync(storageName);
    jest.clearAllMocks();
  });
  it(`initialize storage`, async () => {
    expect(fs.existsSync(storageName)).toEqual(true);
  });
  it(`expect create to write to file correctly`, () => {
    const writeSpy = jest.spyOn(fs, "writeFileSync");
    const ent: GenericEntity = {
      value1: "123",
      value2: 321,
    };
    storage.create(ent);
    const calledData = JSON.parse(
      writeSpy.mock.calls[0][1] as string
    )[0] as GenericEntity;
    expect(calledData.id).toBeDefined();
    expect(calledData.value1).toEqual(ent.value1);
    expect(calledData.value2).toEqual(ent.value2);

    storage.create(ent);
    const stored = storage.getAll();
    expect(stored.length).toEqual(2);
  });
  it(`expect get to work correctly`, () => {
    const ent: GenericEntity = {
      value1: "123",
      value2: 321,
    };
    const e1 = storage.create(ent);
    const e2 = storage.create(ent);
    const result1 = storage.get(e1.id);
    expect(result1).toEqual(e1);
    const result2 = storage.get(e2.id);
    expect(result2).toEqual(e2);
  });
  it(`expect delete to write correctly`, () => {
    const ent: GenericEntity = {
      value1: "123",
      value2: 321,
    };
    const e1 = storage.create(ent);
    const e2 = storage.create(ent);
    const e3 = storage.create(ent);
    const result = storage.delete(e2.id);
    expect(result).toEqual(true);
    expect(storage.get(e2.id)).toEqual(null);

    expect(storage.delete("312")).toEqual(false);
  });
  it(`expect update to work correctly`, () => {
    const ent: GenericEntity = {
      value1: "123",
      value2: 321,
    };
    const e1 = storage.create(ent);
    const e2 = storage.create(ent);
    const result = storage.update({ ...e1, value2: 5000 });
    expect(result).toEqual(true);

    const found1 = storage.get(e1.id);
    expect(found1?.value2).toEqual(5000);
    expect(found1?.value1).toEqual(ent.value1);

    const found2 = storage.get(e2.id);
    expect(found2?.value2).toEqual(ent.value2);
    expect(found2?.value1).toEqual(ent.value1);
  });

  it(`expect update partial data`, () => {
    const ent: GenericEntity = {
      value1: "123",
      value2: 321,
      value3: "555",
    };
    const e1 = storage.create(ent);
    const e2 = storage.create(ent);
    const result = storage.update({ ...e1, value2: 5000, value3: undefined });
    expect(result).toEqual(true);

    const found1 = storage.get(e1.id);
    expect(found1?.value2).toEqual(5000);
    expect(found1?.value1).toEqual(ent.value1);
    expect(found1?.value3).toEqual("555");

    const found2 = storage.get(e2.id);
    expect(found2?.value2).toEqual(ent.value2);
    expect(found2?.value1).toEqual(ent.value1);
  });
});
