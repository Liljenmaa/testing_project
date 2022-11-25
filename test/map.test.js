import map from '../src/map.js';

describe('map', () => {
  it('maps a function to a number array correctly', () => {
    const square = n => n * n;

    expect(map([4, 8], square)).toIncludeAllMembers([16, 64]);
  });
  it('maps a function to a boolean array correctly', () => {
    const flip = b => !b;

    expect(map([true, false, true], flip)).toIncludeAllMembers([
      false,
      true,
      false
    ]);
  });
  it('transforms null to an empty array', () => {
    const square = n => n * n;

    expect(map(null, square)).toBeArrayOfSize(0);
  });
  it('transforms undefined to an empty array', () => {
    const square = n => n * n;

    expect(map(undefined, square)).toBeArrayOfSize(0);
  });
  it("throws TypeError when supplied with an object with attribute 'length' defined", () => {
    const square = n => n * n;

    expect(map({ length: 100 }, square)).toThrow(TypeError);
  });
  it('throws TypeError when supplied with a non-array', () => {
    const square = n => n * n;

    expect(() => map(true, square)).toThrow(TypeError);
  });
  it('throws TypeError when supplied with a non-function', () => {
    const notAFunction = [1, 2, 3];

    expect(() => map([true, false, true], notAFunction)).toThrow(TypeError);
  });
});
