import map from '../src/map.js';

const square = n => n * n;

describe('map', () => {
  describe('maps', () => {
    it('a function to a number array', () => {
      expect(map([4, 8], square)).toIncludeAllMembers([16, 64]);
    });
    it('a function to a boolean array', () => {
      const flip = b => !b;

      expect(map([true, false, true], flip)).toIncludeAllMembers([
        false,
        true,
        false
      ]);
    });
    it('null to an empty array', () => {
      expect(map(null, square)).toBeArrayOfSize(0);
    });
    it('undefined to an empty array', () => {
      expect(map(undefined, square)).toBeArrayOfSize(0);
    });
  });
  describe('handles exceptions', () => {
    it("throws TypeError when supplied with an object with attribute 'length' defined", () => {
      expect(map({ length: 100 }, square)).toThrow(TypeError);
    });
    it('throws TypeError when supplied with a non-array', () => {
      expect(() => map(true, square)).toThrow(TypeError);
    });
    it('throws TypeError when supplied with a non-function', () => {
      const notAFunction = [1, 2, 3];

      expect(() => map([true, false, true], notAFunction)).toThrow(TypeError);
    });
  });
});
