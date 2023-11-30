import { describe, bench } from 'vitest';
import { defaultDeep as defaultDeepRamda } from './defaultDeep.ramda';
import { defaultDeep as defaultDeepRadash } from './defaultDeep.radash';

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

describe('defaultDeep', () => {
  bench('Ramda version', () => {
    defaultDeepRamda(defaultsProps, newProps);
  });

  bench('Radash version', () => {
    defaultDeepRadash(defaultsProps, newProps);
  });
});
