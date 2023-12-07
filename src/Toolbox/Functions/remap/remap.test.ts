import { describe, expect, test } from 'vitest';
import { remap } from './remap';
import { get } from 'radash';

import { remap } from './remap';

test('remap should throw an error if the argToRemap argument is not an array or an object', () => {
  const argToRemap = 123;
  const expectedError = new TypeError(
    `argToRemap must be an Array or an Object`
  );

  expect(() => remap({}, argToRemap)).toThrow(expectedError);
});

test('remap should throw an error if the remapArg argument is not an array or an object', () => {
  const remapArg = 123;
  const argToRemap = {};
  const expectedError = new TypeError(`remapArg must be an Array or an Object`);

  expect(() => remap(remapArg, argToRemap)).toThrow(expectedError);
});

test('remap should return a new object if the argToRemap argument is an object and the remapArg argument is an empty object', () => {
  const argToRemap = {};
  const remapArg = {};
  const expectedResult = {};

  const actualResult = remap(remapArg, argToRemap);

  expect(actualResult).toEqual(expectedResult);
});

test('remap should return a new array if the argToRemap argument is an array and the remapArg argument is an empty array', () => {
  const argToRemap = [];
  const remapArg = [];
  const expectedResult = [];

  const actualResult = remap(remapArg, argToRemap);

  expect(actualResult).toEqual(expectedResult);
});

test('remap should merge the argToRemap object with the remapArg object', () => {
  const argToRemap = {
    name: 'John Doe',
    age: 30,
  };

  const remapArg = {
    age: () => 35,
  };

  const expectedResult = {
    age: 35,
  };

  const actualResult = remap(remapArg, argToRemap);

  expect(actualResult).toEqual(expectedResult);
});

test('remap should recursively merge nested objects', () => {
  const argToRemap = {
    user: {
      name: 'John Doe',
      age: 30,
    },
  };

  const remapArg = {
    user: {
      age: () => 35,
    },
  };

  const expectedResult = {
    user: {
      age: 35,
    },
  };

  const actualResult = remap(remapArg, argToRemap);

  expect(actualResult).toEqual(expectedResult);
});
