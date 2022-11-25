import filter from '../src/filter';

const active = ({ active }) => active;

const users = [
  { user: 'barney', active: true },
  { user: 'betty', active: true },
  { user: 'fred', active: false }
];
const activeUsers = [
  { user: 'barney', active: true },
  { user: 'betty', active: true }
];

describe('filter', () => {
  describe('filters an array of objects', () => {
    it('some items return true for the predicate', () => {
      const result = filter(users, active);
      expect(result).toIncludeAllMembers(activeUsers);
    });
    it('one item return true for the predicate', () => {
      const result = filter(users, ({ user }) => user === 'barney');
      expect(result).toIncludeAllMembers([activeUsers[0]]);
    });
    it('all items return true for the predicate', () => {
      const result = filter(
        users,
        val => typeof val === 'object' && !Array.isArray(val) && val !== null
      );
      expect(result).toIncludeAllMembers(users);
    });
  });
  describe('returns an empty array if', () => {
    it('no items return true for the predicate', () => {
      const result = filter(
        users.map(({ user }) => ({ user, active: false })),
        active
      );
      /* Expecting an empty array, since no users are active */
      expect(result).toBeArrayOfSize(0);
    });
    it('filtered is an empty array', () => {
      const result = filter([], active);
      /* Expecting an empty array, since there is no users */
      expect(result).toBeArrayOfSize(0);
    });
    it('filtered is an empty object', () => {
      const result = filter({}, active);
      /* Expecting an empty array, since there is no users */
      expect(result).toBeArrayOfSize(0);
    });
    it('filtered is null', () => {
      const result = filter(null, active);
      /* Expecting an empty array, since array is null */
      expect(result).toBeArrayOfSize(0);
    });
    it('predicate is an empty function', () => {
      const result = filter(users, () => {});
      /* Expecting an empty array, since predicate returns nothing */
      expect(result).toBeArrayOfSize(0);
    });
  });
  describe('handles exceptions', () => {
    it('throws TypeError if predicate is not a function', () => {
      expect(() => filter(users, true)).toThrow(TypeError);
    });
  });
});
