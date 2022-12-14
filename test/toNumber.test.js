import toNumber from '../src/toNumber.js';

describe('toNumber', () => {
  describe('transforms to itself', () => {
    it('positive number', () => {
      expect(toNumber(1)).toBe(1);
    });
    it('zero', () => {
      expect(toNumber(0)).toBe(0);
    });
    it('negative number', () => {
      expect(toNumber(-1)).toBe(-1);
    });
    it('floating point number', () => {
      expect(toNumber(3.2)).toBe(3.2);
    });
    it('negative floating point number', () => {
      expect(toNumber(-3.2)).toBe(-3.2);
    });
    it('min cap', () => {
      expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
    });
    it('max cap', () => {
      expect(toNumber(Number.MAX_VALUE)).toBe(1.7976931348623157e308);
    });
    it('infinity', () => {
      expect(toNumber(Infinity)).toBe(Infinity);
    });
    it('negative infinity', () => {
      expect(toNumber(-Infinity)).toBe(-Infinity);
    });
  });
  describe('transforms to corresponding number', () => {
    it('positive number string', () => {
      expect(toNumber('1')).toBe(1);
    });
    it('zero string', () => {
      expect(toNumber('0')).toBe(0);
    });
    it('negative number string', () => {
      expect(toNumber('-1')).toBe(-1);
    });
    it('floating point number string', () => {
      expect(toNumber('3.2')).toBe(3.2);
    });
    it('negative floating point number string', () => {
      expect(toNumber('-3.2')).toBe(-3.2);
    });
    it('binary literal', () => {
      expect(toNumber(0b101)).toBe(5);
    });
    it('octal literal', () => {
      expect(toNumber(0o17)).toBe(15);
    });
    it('hexadecimal literal', () => {
      expect(toNumber(0xfa)).toBe(250);
    });
    it('binary string', () => {
      expect(toNumber('0b101')).toBe(5);
    });
    it('octal string', () => {
      expect(toNumber('0o17')).toBe(15);
    });
    it('hexadecimal string', () => {
      expect(toNumber('0xFA')).toBe(250);
    });
    it('function that returns a number', () => {
      expect(toNumber(() => 26)).toBe(26);
    });
    it('positive stringified number with trailing spaces', () => {
      expect(toNumber('  1  ')).toBe(1);
    });
    it('stringified zero with trailing spaces', () => {
      expect(toNumber('  0  ')).toBe(0);
    });
    it('negative stringified number with trailing spaces', () => {
      expect(toNumber('  -1  ')).toBe(-1);
    });
    it('floating stringified number with trailing spaces', () => {
      expect(toNumber('  3.2  ')).toBe(3.2);
    });
    it('floating stringified number with trailing spaces', () => {
      expect(toNumber('  -3.2  ')).toBe(-3.2);
    });
    it('true boolean (to one)', () => {
      expect(toNumber(true)).toBe(1);
    });
    it('false boolean (to zero)', () => {
      expect(toNumber(false)).toBe(0);
    });
  });
  describe('transforms to not a number', () => {
    it('symbol', () => {
      expect(toNumber(Symbol.iterator)).toBe(NaN);
    });
    it('empty object', () => {
      expect(toNumber({})).toBe(NaN);
    });
    it('filled object', () => {
      expect(toNumber({ test: 0 })).toBe(NaN);
    });
    it('empty object without valueOf function', () => {
      let obj = {};
      obj.valueOf = undefined;

      expect(toNumber(obj)).toBe(NaN);
    });
    it('filled object without valueOf function', () => {
      let obj = { test: 0 };
      obj.valueOf = undefined;

      expect(toNumber(obj)).toBe(NaN);
    });
    it("function that doesn't return a number", () => {
      expect(toNumber(() => 'Test String')).toBe(NaN);
    });
    it('null', () => {
      expect(toNumber(null)).toBe(NaN);
    });
    it('undefined', () => {
      expect(toNumber(undefined)).toBe(NaN);
    });
    it('unconvertable string', () => {
      expect(toNumber('Test String')).toBe(NaN);
    });
    it('malformed binary string', () => {
      expect(toNumber('0b202')).toBe(NaN);
    });
    it('malformed octal string', () => {
      expect(toNumber('0b18')).toBe(NaN);
    });
    it('malformed hexadecimal string', () => {
      expect(toNumber('-0xfa')).toBe(NaN);
    });
  });
  describe('transforms an object with valueOf that returns ', () => {
    it('a positive number (to that positive number)', () => {
      let obj = {};
      obj.valueOf = () => 1;

      expect(toNumber(obj)).toBe(1);
    });
    it('a negative number (to that negative number)', () => {
      let obj = {};
      obj.valueOf = () => -1;

      expect(toNumber(obj)).toBe(-1);
    });
    it('a negative number (to that negative number)', () => {
      let obj = {};
      obj.valueOf = () => -1;

      expect(toNumber(obj)).toBe(-1);
    });
    it('a zero (to zero)', () => {
      let obj = {};
      obj.valueOf = () => 0;

      expect(toNumber(obj)).toBe(0);
    });
  });
});
