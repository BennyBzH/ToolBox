import { omit } from 'radash';

export function getAllPropertyDescriptors(obj: {
  [k: string]: unknown;
}): Record<string, PropertyDescriptor> {
  if (!obj) {
    return Object.create(null);
  } else {
    const proto = Object.getPrototypeOf(obj);
    return omit(
      {
        ...getAllPropertyDescriptors(proto),
        ...Object.getOwnPropertyDescriptors(obj),
      },
      [
        'constructor',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'toLocaleString',
        'toString',
        'valueOf',
        '__defineGetter__',
        '__defineSetter__',
        '__lookupGetter__',
        '__lookupSetter__',
        '__proto__',
      ]
    );
  }
}

export function getAllPropertyDescriptors2(obj: {
  [k: string]: unknown;
}): Record<string, PropertyDescriptor> {
  if (!obj) {
    return Object.create(null);
  } else {
    const proto = Object.getPrototypeOf(obj);
    return {
      ...getAllPropertyDescriptors2(proto),
      ...Object.getOwnPropertyDescriptors(obj),
    };
  }
}
