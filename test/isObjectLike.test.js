import isObjectLike from '../src/isObjectLike.js';

describe('isObjectLike', () => {
  describe('object-like', () => {
    it('empty object', () => {
      expect(isObjectLike({})).toBe(true);
    });
    it('filled array', () => {
      expect(isObjectLike([1, 2, 3])).toBe(true);
    });
    it('Date', () => {
      expect(isObjectLike(new Date())).toBe(true);
    });
  });

  describe('not object-like', () => {
    it('Function', () => {
      expect(isObjectLike(Function)).toBe(false);
    });
    it('null', () => {
      expect(isObjectLike(null)).toBe(false);
    });
  });
});
