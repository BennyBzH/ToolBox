import { curry, is } from 'ramda';

/**
 * `defaultDeep`
 */
export const defaultDeep = curry(function defaultDeep(defaultsProps, newProps) {
  if (!is(Object, newProps) && !is(Array, newProps)) {
    return newProps;
  }
  var result = newProps instanceof Array ? [] : {};
  var newValue, key, typeNewValue, typeDef, defValue;
  for (key in defaultsProps) {
    newValue = newProps[key];
    defValue = defaultsProps[key];
    typeNewValue = typeof newValue;
    typeDef = typeof defValue;
    if (typeDef === 'function') {
      result[key] = defValue(newValue, newProps);
      continue;
    }
    if (typeNewValue === 'undefined') {
      result[key] = defValue;
      continue;
    } else {
      result[key] =
        newValue && typeNewValue === 'object'
          ? defaultDeep(defValue, newProps[key])
          : newProps[key];
    }
  }
  return result;
});
