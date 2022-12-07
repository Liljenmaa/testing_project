import countBy from '../src/countBy.js';

const users = [
  { user: 'barney', active: true },
  { user: 'betty', active: true },
  { user: 'fred', active: false }
];

describe('countBy', () => {
  it('counts attributes from an array of objects', () => {
    const isActive = ({ active }) => active;

    expect(countBy(users, isActive)).toBe({ true: 2, false: 1 });
  });
  it('iterates attributes of object', () => {
    const isString = value => typeof value === 'string';

    expect(countBy(users[0], isString)).toBe({ true: 1, false: 1 });
  });
  it('iterates an empty array', () => {
    const emptyArray = [];

    expect(countBy(emptyArray, value => value)).toStrictEqual({});
  });
  it('iterates an empty object', () => {
    const emptyObject = {};

    expect(countBy(emptyObject, value => value)).toStrictEqual({});
  });
  it('handles a function that does not return anything', () => {
    expect(countBy(users, () => {})).toBe({ undefined: 3 });
  });
  describe('handles exceptions', () => {
    it('throws TypeError if first argument is not an array or object', () => {
      expect(() => countBy(true, value => value)).toThrow(TypeError);
    });
    it('throws TypeError if second argument is not a function', () => {
      expect(() => countBy(users, true)).toThrow(TypeError);
    });
  });
});
