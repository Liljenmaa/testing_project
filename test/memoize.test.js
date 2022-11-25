import memoize from '../src/memoize';

const typeError = new TypeError('Expected a function');
const obj1 = { a: 1, b: 2 };

// resolves cache Map values to an array of object values
const objectValues = obj => Object.values(obj);
// resolves cache Map values to an array of object keys
const objectKeys = obj => Object.keys(obj);
// resolves cache Map keys to an array of object values
// JSON.stringify is used, because arrays are compared by their references
const valuesResolver = obj => JSON.stringify(Object.values(obj));
// resolves cache Map keys to an array of object keys
const keysResolver = obj => JSON.stringify(Object.keys(obj));

describe('memoize', () => {
  describe('cache', () => {
    it('is a Map by default', () => {
      const { cache } = memoize(objectValues);
      expect(cache).toEqual(new Map());
    });
    it('can be replaced', () => {
      memoize.Cache = WeakMap;
      const { cache } = memoize(objectValues);
      expect(cache).toEqual(new WeakMap());
      memoize.Cache = Map;
    });
    it('is a Map if replaced with undefined', () => {
      memoize.Cache = undefined;
      const { cache } = memoize(objectValues);
      expect(cache).toEqual(new Map());
    });
    it('should be empty if set() returns undefined', () => {
      class CustomMap extends Map {}
      CustomMap.prototype.set = () => undefined;
      memoize.Cache = CustomMap;
      const values = memoize(objectValues);
      values(obj1);
      expect(values.cache.size).toEqual(0);
      memoize.Cache = Map;
    });
    it('is initialized correctly', () => {
      const values = memoize(objectValues);
      expect(values(obj1)).toIncludeAllMembers([1, 2]);
    });
    it('handles a func that returns undefined', () => {
      const values = memoize(obj => obj.c);
      expect(values(obj1)).toEqual(undefined);
      expect(values.cache.size).toEqual(1);
    });
    it('can be cleared', () => {
      const values = memoize(objectValues);
      expect(values(obj1)).toIncludeAllMembers([1, 2]);
      values.cache.clear();
      expect(values.cache.size).toEqual(0);
    });
  });
  describe('does not add to cache', () => {
    it('if obj references are same', () => {
      const values = memoize(objectValues);
      expect(values(obj1)).toIncludeAllMembers([1, 2]);
      expect(values(obj1)).toIncludeAllMembers([1, 2]); // cache hit
      expect(values.cache.size).toEqual(1);

      // test with object keys cache Map values
      const keys = memoize(objectKeys);
      expect(keys(obj1)).toIncludeAllMembers(['a', 'b']);
      expect(keys(obj1)).toIncludeAllMembers(['a', 'b']); // cache hit
      expect(keys.cache.size).toEqual(1);
    });
    it('if values are the same and values resolver is used', () => {
      const values = memoize(objectValues, valuesResolver);
      expect(values(obj1)).toIncludeAllMembers([1, 2]);
      expect(values({ c: 1, d: 2 })).toIncludeAllMembers([1, 2]); // cache hit
      expect(values.cache.size).toEqual(1);

      // test with object keys cache Map values
      const keys = memoize(objectKeys, valuesResolver);
      expect(keys(obj1)).toIncludeAllMembers(['a', 'b']);
      expect(keys({ c: 1, d: 2 })).toIncludeAllMembers(['a', 'b']); // cache hit
      expect(keys.cache.size).toEqual(1);
    });
    it('if keys are the same and keys resolver is used', () => {
      const values = memoize(objectValues, keysResolver);
      expect(values(obj1)).toIncludeAllMembers([1, 2]);
      expect(values({ a: 3, b: 4 })).toIncludeAllMembers([1, 2]); // cache hit
      expect(values.cache.size).toEqual(1);

      // test with object keys cache Map values
      const keys = memoize(objectKeys, keysResolver);
      expect(keys(obj1)).toIncludeAllMembers(['a', 'b']);
      expect(keys({ a: 3, b: 4 })).toIncludeAllMembers(['a', 'b']); // cache hit
      expect(keys.cache.size).toEqual(1);
    });
    it('if boolean values are the same', () => {
      const values = memoize(val => val);
      expect(values(true)).toEqual(true);
      expect(values(true)).toEqual(true); // cache hit
      expect(values.cache.size).toEqual(1);
    });
    it('if values are undefined', () => {
      const values = memoize(val => val);
      expect(values(undefined)).toEqual(undefined);
      expect(values(undefined)).toEqual(undefined); // cache hit
      expect(values.cache.size).toEqual(1);
    });
  });
  describe('adds to cache', () => {
    it('if obj references are different', () => {
      const values = memoize(objectValues);
      expect(values(obj1)).toIncludeAllMembers([1, 2]);
      expect(values({ a: 1, b: 2 })).toIncludeAllMembers([1, 2]);
      expect(values.cache.size).toEqual(2);

      // test with object keys cache Map values
      const keys = memoize(objectKeys);
      expect(keys(obj1)).toIncludeAllMembers(['a', 'b']);
      expect(keys({ a: 1, b: 2 })).toIncludeAllMembers(['a', 'b']);
      expect(keys.cache.size).toEqual(2);
    });
    it('if values are different and values resolver is used', () => {
      const values = memoize(objectValues, valuesResolver);
      expect(values(obj1)).toIncludeAllMembers([1, 2]);
      expect(values({ a: 3, b: 4 })).toIncludeAllMembers([3, 4]);
      expect(values.cache.size).toEqual(2);

      // test with object keys cache Map values
      const keys = memoize(objectKeys, valuesResolver);
      expect(keys(obj1)).toIncludeAllMembers(['a', 'b']);
      expect(keys({ a: 3, b: 4 })).toIncludeAllMembers(['a', 'b']);
      expect(keys.cache.size).toEqual(2);
    });
    it('if keys are different and keys resolver is used', () => {
      const values = memoize(objectValues, keysResolver);
      expect(values(obj1)).toIncludeAllMembers([1, 2]);
      expect(values({ c: 1, d: 2 })).toIncludeAllMembers([1, 2]);
      expect(values.cache.size).toEqual(2);

      // test with object keys cache Map values
      const keys = memoize(objectKeys, keysResolver);
      expect(keys(obj1)).toIncludeAllMembers(['a', 'b']);
      expect(keys({ c: 1, d: 2 })).toIncludeAllMembers(['c', 'd']);
      expect(keys.cache.size).toEqual(2);
    });
    it('if boolean values are different', () => {
      const values = memoize(val => val);
      expect(values(true)).toEqual(true);
      expect(values(false)).toEqual(false);
      expect(values.cache.size).toEqual(2);
    });
    it('if values are null, undefined, NaN', () => {
      const values = memoize(val => val);
      expect(values(null)).toEqual(null);
      expect(values(undefined)).toEqual(undefined);
      expect(values.cache.size).toEqual(2);
      expect(values(NaN)).toEqual(NaN);
      expect(values.cache.size).toEqual(3);
    });
  });
  describe('handles exceptions', () => {
    it('throws TypeError if func is not a function', () => {
      expect(() => memoize(1)).toThrow(typeError);
    });
    it('throws TypeError if resolver is not a function', () => {
      expect(() => memoize(objectValues, 1)).toThrow(typeError);
    });
    it('throws TypeError if cache does not implement Map interface', () => {
      memoize.Cache = Array;
      const values = memoize(objectValues);
      expect(values.cache).toBeArrayOfSize(0);
      expect(() => values(obj1)).toThrow(TypeError);
    });
  });
});
