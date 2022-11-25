import countBy from '../src/countBy.js';

describe('countBy', () => {
  it('can correctly count attributes from an array of objects', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'betty', active: true },
      { user: 'fred', active: false }
    ];

    expect(countBy(users, value => value.active)).toBe({ true: 2, false: 1 });
  });
  it('can correctly iterate attributes of object', () => {
    const user = { user: 'barney', active: true };

    expect(countBy(user, value => typeof value === 'string')).toBe({
      true: 1,
      false: 1
    });
  });
  it('can correctly iterate an empty array', () => {
    const emptyArray = [];

    expect(countBy(emptyArray, value => value)).toStrictEqual({});
  });
  it('can correctly iterate an empty object', () => {
    const emptyObject = {};

    expect(countBy(emptyObject, value => value)).toStrictEqual({});
  });
  it('can handle a function that does not return anything', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'betty', active: true },
      { user: 'fred', active: false }
    ];

    expect(countBy(users, value => {})).toBe({ undefined: 3 });
  });
  it('throws TypeError if first argument is not an array or object', () => {
    expect(() => countBy(true, value => value)).toThrow(TypeError);
  });
  it('throws TypeError if second argument is not a function', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'betty', active: true },
      { user: 'fred', active: false }
    ];

    expect(() => countBy(users, true)).toThrow(TypeError);
  });
});
