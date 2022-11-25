import defaultTo from '../src/defaultTo';

const defaultNumber = 10;
const defaultToNumber = checkedValue => defaultTo(checkedValue, defaultNumber);

describe('defaultTo', () => {
  describe('defaults to value', () => {
    it('checked is NaN', () => {
      const result = defaultToNumber(NaN);
      expect(result).toEqual(defaultNumber);
    });
    it('checked is null', () => {
      const result = defaultToNumber(null);
      expect(result).toEqual(defaultNumber);
    });
    it('checked is undefined', () => {
      const result = defaultToNumber(undefined);
      expect(result).toEqual(defaultNumber);
    });
  });

  describe('does not default to value', () => {
    it('checked is a positive number', () => {
      const result = defaultToNumber(1);
      expect(result).toEqual(1);
    });
    it('checked is a negative number', () => {
      const result = defaultToNumber(-1);
      expect(result).toEqual(-1);
    });
    it('checked is 0', () => {
      const result = defaultToNumber(0);
      expect(result).toEqual(0);
    });
    it('checked is max cap', () => {
      const result = defaultToNumber(Number.MAX_VALUE);
      expect(result).toEqual(Number.MAX_VALUE);
    });
    it('checked is infinity', () => {
      const result = defaultToNumber(Infinity);
      expect(result).toEqual(Infinity);
    });
    it('checked is binary literal', () => {
      const result = defaultToNumber(0b101);
      expect(result).toEqual(0b101);
    });
    it('checked is a boolean', () => {
      const result = defaultToNumber(false);
      expect(result).toEqual(false);
    });
    it('checked is a date', () => {
      const result = defaultToNumber(new Date());
      expect(result).toBeDate();
    });
    it('checked is a function', () => {
      const result = defaultToNumber(() => {});
      expect(result).toBeFunction();
    });
    it('checked is a string', () => {
      const result = defaultToNumber('hello');
      expect(result).toEqual('hello');
    });
    it('checked is an empty string', () => {
      const result = defaultToNumber('');
      expect(result).toEqual('');
    });
    it('checked is a filled object', () => {
      const obj = { test: 1 };
      const result = defaultToNumber(obj);
      expect(result).toEqual(obj);
    });
    it('checked is an empty object', () => {
      const result = defaultToNumber({});
      expect(result).toBeEmptyObject();
    });
    it('checked is an empty array', () => {
      const result = defaultToNumber([]);
      expect(result).toBeArrayOfSize(0);
    });
    it('checked is a symbol', () => {
      const symbol = Symbol();
      const result = defaultToNumber(symbol);
      expect(result).toEqual(symbol);
    });
  });

  describe('handles exceptions', () => {
    /* From the source file documentation it is unclear whether
     * omitting the default value is allowed. In any case, the result
     * is unpredictable, so llegalArgumentException or similar Error
     * should be thrown. */
    it('throws an error if default value is not provided', () => {
      expect(() => defaultTo(null)).toThrow();
    });
  });
});
