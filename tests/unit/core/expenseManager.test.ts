import { ExpenseManager } from "../../../src/core/expenseManager";
import { ExpenseResponder } from "../../../src/core/expenseResponder";
import { ExpenseRepository } from "../../../src/repository/expenseRepository";
import fs from "fs";

describe(`ExpenseManager testing`, () => {
  let manager: ExpenseManager;
  let createSpy: jest.SpyInstance;
  let updateSpy: jest.SpyInstance;
  let deleteSpy: jest.SpyInstance;
  let summarySpy: jest.SpyInstance;
  let getAllSpy: jest.SpyInstance;

  let responderSpy: jest.SpyInstance;
  let headerSpy: jest.SpyInstance;

  const storageName = "test-expense";
  beforeEach(() => {
    const repo = new ExpenseRepository(storageName);
    createSpy = jest.spyOn(repo, "create");
    updateSpy = jest.spyOn(repo, "update");
    deleteSpy = jest.spyOn(repo, "delete");
    summarySpy = jest.spyOn(repo, "getAmountSummary");
    getAllSpy = jest.spyOn(repo, "getAll");

    const responder = new ExpenseResponder();
    responderSpy = jest.spyOn(responder, "output").mockImplementation(() => {});
    headerSpy = jest
      .spyOn(responder, "recordsWithHeader")
      .mockImplementation(() => {});
    manager = new ExpenseManager(repo, responder);
  });
  afterEach(() => {
    fs.unlinkSync(storageName);
    jest.clearAllMocks();
  });
  it(`test add ok`, () => {
    createSpy.mockImplementation(() => {
      return {
        id: "123",
        amount: 100,
        createdAt: new Date().toISOString(),
        description: "data",
      };
    });
    manager.add("data", 100);
    expect(createSpy).toHaveBeenCalledWith({
      description: "data",
      amount: 100,
    });
    expect(responderSpy).toHaveBeenCalledWith(
      `Expense added successfully (ID: 123)`
    );
  });
  it(`test add bad data`, () => {
    createSpy.mockImplementation(() => {});
    manager.add("123", "500" as any);
    expect(responderSpy).toHaveBeenCalledWith(
      `Not a valid description or amount`
    );
    responderSpy.mockClear();
    manager.add(123 as any, 500);
    expect(responderSpy).toHaveBeenCalledWith(
      `Not a valid description or amount`
    );
  });
  it(`test update good data`, () => {
    updateSpy.mockImplementation(() => true);
    manager.update("xxx", "m");
    expect(updateSpy).toHaveBeenCalledWith({
      id: "xxx",
      description: "m",
      amount: undefined,
    });
    expect(responderSpy).toHaveBeenCalledWith(`Expense updated successfully`);

    updateSpy.mockClear();

    manager.update("xxx", undefined, 500);
    expect(updateSpy).toHaveBeenCalledWith({
      id: "xxx",
      description: undefined,
      amount: 500,
    });
    expect(responderSpy).toHaveBeenCalledWith(`Expense updated successfully`);
  });
  it(`delete success call`, () => {
    deleteSpy.mockImplementation(() => true);
    deleteSpy.mockReturnValue(true);

    manager.delete("xsf");

    expect(deleteSpy).toHaveBeenCalledWith("xsf");
    expect(responderSpy).toHaveBeenCalledWith(`Expense deleted successfully`);
  });
  it(`test summary without month`, () => {
    summarySpy.mockImplementation(() => 120);
    manager.summary();
    expect(responderSpy).toHaveBeenCalledWith(`Total expenses: 120`);
  });
  it(`test summary with month`, () => {
    summarySpy.mockImplementation(() => 120);
    manager.summary(5);
    expect(responderSpy).toHaveBeenCalledWith(`Total expenses for May: 120`);
  });
  it(`test summary with floating month`, () => {
    summarySpy.mockImplementation(() => 120);
    manager.summary(5.45);
    expect(summarySpy).toHaveBeenCalledWith(5);
  });
  it(`test summary with bad month`, () => {
    summarySpy.mockImplementation(() => 120);
    manager.summary(1000);
    expect(responderSpy).toHaveBeenCalledWith(`Not a valid month`);

    responderSpy.mockClear();

    manager.summary("10" as any);
    expect(responderSpy).toHaveBeenCalledWith(`Not a valid month`);
  });
  it(`test list method 0 value`, () => {
    getAllSpy.mockImplementation(() => []);
    manager.list();

    expect(responderSpy).toHaveBeenCalledWith(`No records for now`);
  });
  it(`test list method 2 values`, () => {
    getAllSpy.mockImplementation(() => [{ id: "1" }, { id: "2" }]);
    manager.list();

    expect(headerSpy).toHaveBeenCalledWith([{ id: "1" }, { id: "2" }]);
  });
});
