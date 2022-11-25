import defaultToAny from '../src/defaultToAny';

const defaultNumber = 10;
const defaultToNumber = checkedValues =>
  defaultToAny(...checkedValues, defaultNumber);

describe('defaultToAny', () => {
  describe('defaults to value', () => {
    it('checked are null, NaN, undefined', () => {
      const result = defaultToNumber([null, NaN, undefined]);
      expect(result).toEqual(defaultNumber);
    });
    it('returns the first value that is not NaN, null or undefined', () => {
      const result = defaultToAny(undefined, 1, null, 10, NaN);
      expect(result).toEqual(1);
    });
  });

  describe('does not default to value', () => {
    it('checked is a positive number', () => {
      const result = defaultToAny(1, null, -1, defaultNumber);
      expect(result).toEqual(1);
    });
    it('checked is a negative number', () => {
      const result = defaultToAny(-1, null, -1, defaultNumber);
      expect(result).toEqual(-1);
    });
    it('checked is 0', () => {
      const result = defaultToAny(0, null, -1, defaultNumber);
      expect(result).toEqual(0);
    });
    it('checked is max cap', () => {
      const result = defaultToAny(Number.MAX_VALUE, null, -1, defaultNumber);
      expect(result).toEqual(Number.MAX_VALUE);
    });
    it('checked is infinity', () => {
      const result = defaultToAny(Infinity, null, -1, defaultNumber);
      expect(result).toEqual(Infinity);
    });
    it('checked is binary literal', () => {
      const result = defaultToAny(0b101, null, -1, defaultNumber);
      expect(result).toEqual(0b101);
    });
    it('checked is a boolean', () => {
      const result = defaultToAny(false, true, defaultNumber);
      expect(result).toEqual(false);
    });
    it('checked is a date', () => {
      const result = defaultToAny(new Date(), 'hello', defaultNumber);
      expect(result).toBeDate();
    });
    it('checked is a function', () => {
      const result = defaultToAny(() => {}, 'hello', defaultNumber);
      expect(result).toBeFunction();
    });
    it('checked is a string', () => {
      const result = defaultToAny('hello', 'world', defaultNumber);
      expect(result).toEqual('hello');
    });
    it('checked is an empty string', () => {
      const result = defaultToAny('', 'hello');
      expect(result).toEqual('');
    });
    it('checked is a filled object', () => {
      const obj = { test: 1 };
      const result = defaultToAny(obj, 'hello', defaultNumber);
      expect(result).toEqual(obj);
    });
    it('checked is an empty object', () => {
      const result = defaultToAny({}, 'hello', defaultNumber);
      expect(result).toBeEmptyObject();
    });
    it('checked is an empty array', () => {
      const result = defaultToAny([], 'hello', defaultNumber);
      expect(result).toBeArrayOfSize(0);
    });
    it('checked is a symbol', () => {
      const symbol = Symbol();
      const result = defaultToAny(symbol, 'hello', defaultNumber);
      expect(result).toEqual(symbol);
    });
  });
  describe('handles exceptions', () => {
    /* From the source file documentation it is unclear whether
     * omitting default values is allowed. In any case, the result
     * is unpredictable, so llegalArgumentException or similar Error
     * should be thrown. */
    it('throws an error if no default values are provided', () => {
      expect(() => defaultToAny(null)).toThrow();
    });
  });
});
