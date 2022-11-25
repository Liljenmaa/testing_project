import toNumber from '../src/toNumber.js';

describe('toNumber', () => {
  it('transforms positive number to itself', () => {
    expect(toNumber(1)).toBe(1);
  });
  it('transforms zero to itself', () => {
    expect(toNumber(0)).toBe(0);
  });
  it('transforms negative number to itself', () => {
    expect(toNumber(-1)).toBe(-1);
  });
  it('transforms floating point number to itself', () => {
    expect(toNumber(3.2)).toBe(3.2);
  });
  it('transforms a negative floating point number to itself', () => {
    expect(toNumber(-3.2)).toBe(-3.2);
  });
  it('transforms min cap to itself', () => {
    expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
  });
  it('transforms max cap to itself', () => {
    expect(toNumber(Number.MAX_VALUE)).toBe(1.7976931348623157e308);
  });
  it('transforms infinity to itself', () => {
    expect(toNumber(Infinity)).toBe(Infinity);
  });
  it('transforms negative infinity to itself', () => {
    expect(toNumber(-Infinity)).toBe(-Infinity);
  });
  it("transforms positive number string to its' rep number", () => {
    expect(toNumber('1')).toBe(1);
  });
  it("transforms zero string to its' rep number", () => {
    expect(toNumber('0')).toBe(0);
  });
  it("transforms negative number string to its' rep number", () => {
    expect(toNumber('-1')).toBe(-1);
  });
  it("transforms floating point number string to its' rep number", () => {
    expect(toNumber('3.2')).toBe(3.2);
  });
  it("transforms a negative floating point number string to its' rep number", () => {
    expect(toNumber('-3.2')).toBe(-3.2);
  });
  it('transforms a symbol to not a number', () => {
    expect(toNumber(Symbol.iterator)).toBe(NaN);
  });
  it('transforms an empty object to not a number', () => {
    expect(toNumber({})).toBe(NaN);
  });
  it('transforms a filled object to not a number', () => {
    expect(toNumber({ test: 0 })).toBe(NaN);
  });
  it('transforms an empty object without valueOf function to not a number', () => {
    let obj = {};
    obj.valueOf = undefined;

    expect(toNumber(obj)).toBe(NaN);
  });
  it('transforms a filled object without valueOf function to not a number', () => {
    let obj = { test: 0 };
    obj.valueOf = undefined;

    expect(toNumber(obj)).toBe(NaN);
  });
  it('transforms an object with valueOf that returns a positive number to that positive number', () => {
    let obj = {};
    obj.valueOf = () => 1;

    expect(toNumber(obj)).toBe(1);
  });
  it('transforms an object with valueOf that returns a zero to zero', () => {
    let obj = {};
    obj.valueOf = () => 0;

    expect(toNumber(obj)).toBe(0);
  });
  it('transforms an object with valueOf that returns a negative number to that negative number', () => {
    let obj = {};
    obj.valueOf = () => -1;

    expect(toNumber(obj)).toBe(-1);
  });
  it('transforms an object with valueOf that returns a negative number to that negative number', () => {
    let obj = {};
    obj.valueOf = () => -1;

    expect(toNumber(obj)).toBe(-1);
  });
  it('transforms a function that returns a number to that number', () => {
    expect(() => 26).toBe(26);
  });
  it("transforms a function that doesn't return a number to not a number", () => {
    expect(() => 'Test String').toBe(NaN);
  });
  it('transforms the true boolean to one', () => {
    expect(toNumber(true)).toBe(1);
  });
  it('transforms the false boolean to zero', () => {
    expect(toNumber(false)).toBe(0);
  });
  it('transforms null to not a number', () => {
    expect(toNumber(null)).toBe(NaN);
  });
  it('transforms undefined to not a number', () => {
    expect(toNumber(undefined)).toBe(NaN);
  });
  it('transforms a positive stringified number with trailing spaces to that number', () => {
    expect(toNumber('  1  ')).toBe(1);
  });
  it('transforms a stringified zero with trailing spaces to that number', () => {
    expect(toNumber('  0  ')).toBe(0);
  });
  it('transforms a negative stringified number with trailing spaces to that number', () => {
    expect(toNumber('  -1  ')).toBe(-1);
  });
  it('transforms a floating stringified number with trailing spaces to that number', () => {
    expect(toNumber('  3.2  ')).toBe(3.2);
  });
  it('transforms a floating stringified number with trailing spaces to that number', () => {
    expect(toNumber('  -3.2  ')).toBe(-3.2);
  });
  it('transforms an unconvertable string to not a number', () => {
    expect(toNumber('Test String')).toBe(NaN);
  });
  it('transforms a binary literal to corresponding number', () => {
    expect(toNumber(0b101)).toBe(5);
  });
  it('transforms an octal literal to corresponding number', () => {
    expect(toNumber(0o17)).toBe(15);
  });
  it('transforms a hexadecimal literal to corresponding number', () => {
    expect(toNumber(0xfa)).toBe(250);
  });
  it("transforms a binary string to its' rep number", () => {
    expect(toNumber('0b101')).toBe(5);
  });
  it('transforms a malformed binary string to not a number', () => {
    expect(toNumber('0b202')).toBe(NaN);
  });
  it("transforms an octal string to its' rep number", () => {
    expect(toNumber('0o17')).toBe(15);
  });
  it('transforms a malformed octal string to not a number', () => {
    expect(toNumber('0b18')).toBe(NaN);
  });
  it("transforms a hexadecimal string to its' rep number", () => {
    expect(toNumber('0xFA')).toBe(250);
  });
  it('transforms a malformed hexadecimal string to not a number', () => {
    expect(toNumber('-0xfa')).toBe(NaN);
  });
});
