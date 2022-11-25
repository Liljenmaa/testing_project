import words from '../src/words.js';

describe('words', () => {
  it('transforms an ascii sentence to words of string', () => {
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
  it("transforms an ascii sentence with custom regex of only accepting words with 'a' to correctly identify those words", () => {
    expect(
      words('The quick brown fox jumps over a lazy dog', /\b\w*a\w*\b/g)
    ).toIncludeAllMembers(['a', 'lazy']);
  });

  it('transforms a unicode sentence to words of string without unicode characters', () => {
    expect(words('fred, barney, & pebbles')).toIncludeAllMembers([
      'fred',
      'barney',
      'pebbles'
    ]);
  });
  it('transforms a unicode sentence with regex matching word-ending commas to words of string without commas', () => {
    expect(words('fred, barney, & pebbles', /[^, ]+/g)).toIncludeAllMembers([
      'fred',
      'barney',
      '&',
      'pebbles'
    ]);
  });
  it('transforms an empty string to an empty array', () => {
    expect(words('')).toBeArrayOfSize(0);
  });
  it('transforms an empty string with a pattern to an empty array', () => {
    expect(words('', 'abcd')).toBeArrayOfSize(0);
  });
  it('can use a non-string as a regular expression correctly', () => {
    expect(
      words('No true scotsman puts sugar on his porridge', true)
    ).toIncludeAllMembers(['true']);
  });
  it('throws a TypeError when given a non-string input', () => {
    expect(() => words(true)).toThrow(TypeError);
  });
  it('throws a TypeError when given a non-string input with a valid pattern', () => {
    expect(() => words(true, 'abcd')).toThrow(TypeError);
  });
  it('throws a TypeError when given a non-string input with an invalid pattern', () => {
    expect(() => words(true, '[')).toThrow(TypeError);
  });
  it('throws a SyntaxError when given an invalid pattern', () => {
    expect(() => words('Test', '[')).toThrow(SyntaxError);
  });
});
