import isObjectLike from '../src/isObjectLike.js';

describe('isObjectLike', () => {
  it('regards empty object as true', () => {
    expect(isObjectLike({})).toBe(true);
  });
  it('regards filled array as true', () => {
    expect(isObjectLike([1, 2, 3])).toBe(true);
  });
  it('regards Date as true', () => {
    expect(isObjectLike(new Date())).toBe(true);
  });
  it('regards Function as false', () => {
    expect(isObjectLike(Function)).toBe(false);
  });
  it('regards null as false', () => {
    expect(isObjectLike(null)).toBe(false);
  });
});
