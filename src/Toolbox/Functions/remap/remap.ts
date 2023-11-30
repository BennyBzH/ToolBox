import { isArray, isFunction, isObject, mapEntries } from 'radash';

function remap(
  remapArg: Record<string, unknown> | unknown[],
  argToRemap: Record<string, unknown> | unknown[]
): Record<string, unknown> | unknown[] | null {
  if (!(isArray(argToRemap) || isObject(argToRemap)))
    throw new TypeError(`argToRemap must be an Array or an Object`);

  if (!(isArray(remapArg) || isObject(remapArg)))
    throw new TypeError(`remapArg must be an Array or an Object`);

  if (isObject(remapArg)) {
    return mapEntries(
      remapArg as Record<string, unknown>,
      (key: string, value: unknown) => {
        if (isFunction(value)) return [key, value(argToRemap)];
        if (isObject(value) || isArray(value))
          return [key, remap(value as Record<string, unknown>, argToRemap)];
        return [key, value];
      }
    );
  }

  if (isArray(remapArg)) {
    let newArr: unknown[] = [];
    for (const value of remapArg as unknown[]) {
      if (isFunction(value)) newArr.push(value(argToRemap));
      else if (isObject(value) || isArray(value))
        newArr.push(remap(value as Record<string, unknown>, argToRemap));
      else newArr.push(value);
    }
    return newArr;
  }

  return null;
}

export { remap };
