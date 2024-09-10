import { unlinkSync } from "fs";
import { ExpenseRepository } from "../../../src/repository/expenseRepository";

describe(`Expense Repository specifics`, () => {
  const testFilePath = "./expense-test";
  let repo: ExpenseRepository;
  beforeEach(() => {
    repo = new ExpenseRepository(testFilePath);
  });
  afterEach(() => {
    try {
      unlinkSync(testFilePath);
    } catch {
      console.log(`unlink failed`);
    }
  });
  it(`summary for all entities`, () => {
    repo.create({ amount: 100 });
    repo.create({ amount: 20 });
    const amount = repo.getAmountSummary();
    expect(amount).toEqual(120);
  });
  it(`summary for 0 entities`, () => {
    const amount = repo.getAmountSummary();
    expect(amount).toEqual(0);
  });
  it(`summary for month, no entries with month`, () => {
    const e1 = repo.create({ amount: 100 });
    const e2 = repo.create({ amount: 20 });
    const february = new Date();
    february.setMonth(1);
    repo.update({
      ...e1,
      createdAt: february.toISOString(),
    });
    repo.update({
      ...e2,
      createdAt: february.toISOString(),
    });
    const amount = repo.getAmountSummary(8);
    expect(amount).toEqual(0);
  });
  it(`summary for month, entries with month`, () => {
    const e1 = repo.create({ amount: 100 });
    const e2 = repo.create({ amount: 20 });
    const february = new Date();
    february.setMonth(1);
    repo.update({
      ...e1,
      createdAt: february.toISOString(),
    });
    repo.update({
      ...e2,
      createdAt: february.toISOString(),
    });
    const amount = repo.getAmountSummary(2);
    expect(amount).toEqual(120);
  });
});
