import { describe, expect, test } from 'vitest';
import { defaultDeep } from './defaultDeep.ramda';

test('defaultDeep should return the newProps object if it is not an object or an array', () => {
  const newProps = 'string';
  const expectedResult = newProps;

  const actualResult = defaultDeep({}, newProps);
  expect(actualResult).toEqual(expectedResult);
});

test('defaultDeep should return a new object if the newProps object is an empty object', () => {
  const newProps = {};
  const expectedResult = {};

  const actualResult = defaultDeep({}, newProps);

  expect(actualResult).toEqual(expectedResult);
});

test('defaultDeep should return a new array if the newProps object is an empty array', () => {
  const newProps = [];
  const expectedResult = [];

  const actualResult = defaultDeep({}, newProps);

  expect(actualResult).toEqual(expectedResult);
});

test('defaultDeep should merge the newProps object with the defaultsProps object', () => {
  const defaultsProps = {
    name: 'John Doe',
    age: 30,
  };

  const newProps = {
    age: 35,
  };

  const expectedResult = {
    name: 'John Doe',
    age: 35,
  };

  const actualResult = defaultDeep(defaultsProps, newProps);

  expect(actualResult).toEqual(expectedResult);
});

test('defaultDeep should call the default function if the newProps object is undefined', () => {
  const defaultsProps = {
    name: () => 'John Doe',
    age: () => 30,
  };

  const newProps = {};

  const expectedResult = {
    name: 'John Doe',
    age: 30,
  };

  const actualResult = defaultDeep(defaultsProps, newProps);

  expect(actualResult).toEqual(expectedResult);
});

test('defaultDeep should recursively merge nested objects', () => {
  const defaultsProps = {
    user: {
      name: 'John Doe',
      age: 30,
    },
  };

  const newProps = {
    user: {
      age: 35,
    },
  };

  const expectedResult = {
    user: {
      name: 'John Doe',
      age: 35,
    },
  };

  const actualResult = defaultDeep(defaultsProps, newProps);

  expect(actualResult).toEqual(expectedResult);
});
