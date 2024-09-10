import { isValidNumber, isValidString } from "../../../src/lib/validators";

describe(`Validator functions test`, () => {
  it(`isValidString`, () => {
    expect(isValidString(123)).toEqual(false);
    expect(isValidString(NaN)).toEqual(false);
    expect(isValidString({})).toEqual(false);
    expect(isValidString("NaN")).toEqual(true);
    expect(isValidString("")).toEqual(false);
    expect(isValidString("data")).toEqual(true);
  });
  it(`isValidNumber`, () => {
    expect(isValidNumber(123)).toEqual(true);
    expect(isValidNumber(NaN)).toEqual(false);
    expect(isValidNumber({})).toEqual(false);
    expect(isValidNumber("NaN")).toEqual(false);
    expect(isValidNumber(0)).toEqual(true);
    expect(isValidNumber(-5)).toEqual(true);
  });
});
