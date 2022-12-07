import words from '../src/words.js';

describe('words', () => {
  describe('transforms', () => {
    it('an ascii sentence to words of string', () => {
      expect(
        words('The quick brown fox jumps over a lazy dog')
      ).toIncludeAllMembers([
        'The',
        'quick',
        'brown',
        'fox',
        'jumps',
        'over',
        'a',
        'lazy',
        'dog'
      ]);
    });
    it("an ascii sentence with custom regex of only accepting words with 'a'", () => {
      expect(
        words('The quick brown fox jumps over a lazy dog', /\b\w*a\w*\b/g)
      ).toIncludeAllMembers(['a', 'lazy']);
    });
    it('a unicode sentence to words of string without unicode characters', () => {
      expect(words('fred, barney, & pebbles')).toIncludeAllMembers([
        'fred',
        'barney',
        'pebbles'
      ]);
    });
    it('a unicode sentence with regex matching word-ending commas to words of string without commas', () => {
      expect(words('fred, barney, & pebbles', /[^, ]+/g)).toIncludeAllMembers([
        'fred',
        'barney',
        '&',
        'pebbles'
      ]);
    });
    it('an empty string to an empty array', () => {
      expect(words('')).toBeArrayOfSize(0);
    });
    it('an empty string with a pattern to an empty array', () => {
      expect(words('', 'abcd')).toBeArrayOfSize(0);
    });
    it('an ascii sentence with a non-string as a regular expression', () => {
      expect(
        words('No true scotsman puts sugar on his porridge', true)
      ).toIncludeAllMembers(['true']);
    });
  });
  describe('handles exceptions', () => {
    it('throws a TypeError with a non-string input', () => {
      expect(() => words(true)).toThrow(TypeError);
    });
    it('throws a TypeError with a non-string input with a valid pattern', () => {
      expect(() => words(true, 'abcd')).toThrow(TypeError);
    });
    it('throws a TypeError with a non-string input with an invalid pattern', () => {
      expect(() => words(true, '[')).toThrow(TypeError);
    });
    it('throws a SyntaxError with an invalid pattern', () => {
      expect(() => words('Test', '[')).toThrow(SyntaxError);
    });
  });
});
