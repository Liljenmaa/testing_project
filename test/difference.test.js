import difference from '../src/difference';

describe('difference', () => {
  describe('returns an array of values not included in other arrays', () => {
    it('works on arrays of numbers', () => {
      const result = difference([2, 1, -10], [2, 3], [2, -10]);
      expect(result).toIncludeAllMembers([1]);
    });
    it('works on arrays of numbers and strings', () => {
      const result = difference([2, '', 'hello', 1], [2, 3, 'hello']);
      expect(result).toIncludeAllMembers([1, '']);
    });
    it('works on arrays of numbers and booleans', () => {
      const result = difference([2, true, false, 1], [2], [3], [false]);
      expect(result).toIncludeAllMembers([1, true]);
    });
    it('works on arrays of numbers and dates', () => {
      const result = difference([2, new Date(), false, 1], [2], [3], [false]);
      expect(result).toBeArrayOfSize(2);
      const foundAllDifferences = result.every(
        value => value === 1 || value instanceof Date
      );
      expect(foundAllDifferences).toEqual(true);
    });
    it('works on arrays of numbers and functions', () => {
      const result = difference([2, () => {}, false, 1], [2], [3], [false]);
      expect(result).toBeArrayOfSize(2);
      const foundAllDifferences = result.every(
        value => value === 1 || value instanceof Function
      );
      expect(foundAllDifferences).toEqual(true);
    });
    it('works on arrays of objects', () => {
      const result = difference(
        [{ value: 2 }, { value: 1 }, { value: -10 }],
        [{ value: 2 }, { value: 3 }, { value: -10 }]
      );
      expect(result).toIncludeAllMembers([{ value: 1 }]);
    });
    it('works on arrays of nested objects', () => {
      const result = difference(
        [
          { values: [{ value: true }] },
          { values: [1] },
          { values: [{ value: -10 }] }
        ],
        [{ values: [{ value: true }] }, { values: [3] }, { values: [-10] }]
      );
      expect(result).toIncludeAllMembers([
        { values: [1] },
        { values: [{ value: -10 }] }
      ]);
    });
    it('works on arrays of empty objects', () => {
      const result = difference([{}], [{ value: 1 }, 2, 3, -10]);
      expect(result).toIncludeAllMembers([{}]);
    });
    it('array is empty', () => {
      const result = difference([], [2, 3, -10]);
      expect(result).toBeArrayOfSize(0);
    });
    it('other arrays are empty', () => {
      const result = difference([1, 2, 3], [], []);
      expect(result).toIncludeAllMembers([1, 2, 3]);
    });
    it('other arrays are not provided', () => {
      const result = difference([1, 2, 3]);
      expect(result).toIncludeAllMembers([1, 2, 3]);
    });
  });

  describe('returns an empty array if params are not arrays', () => {
    it('params are objects', () => {
      const result = difference(
        { values: [2, 1, -10] },
        { values: [2, 3, -10] }
      );
      expect(result).toBeArrayOfSize(0);
    });
  });
});
