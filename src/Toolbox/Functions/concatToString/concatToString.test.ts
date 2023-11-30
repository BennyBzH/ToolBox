import { describe, expect, test } from 'vitest';
import { concatToString } from './concatToString';

describe('concatToString', () => {
  test('should return an empty string when no arguments are provided', () => {
    expect(concatToString()).toBe('');
  });

  test('should concatenate string arguments', () => {
    expect(concatToString('Hello', 'World')).toBe('Hello World');
  });

  test('should concatenate number arguments', () => {
    expect(concatToString(1, 2, 3)).toBe('1 2 3');
  });

  test('should concatenate array arguments', () => {
    expect(concatToString([1, 2, 3], ['Hello', 'World'])).toBe(
      '1 2 3 Hello World'
    );
  });

  test('should concatenate object arguments', () => {
    expect(concatToString({ name: 'John', age: 30 })).toBe('name age');
  });

  test('should ignore falsy values', () => {
    expect(concatToString('Hello', null, undefined, '', 0)).toBe('Hello');
  });
});
