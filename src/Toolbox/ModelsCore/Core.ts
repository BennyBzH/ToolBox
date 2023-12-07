export default class ModelsCore {
  static DEFAULT_OMIT = [
    'constructor',
    'hasOwnProperty',
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
  ]

  static omit(arg0: Record<string, unknown>, arr: string[]) {
    if (typeof arg0 !== 'object') throw new TypeError('ModelsCore.omit `arg0` must be an object')
    return Object.keys(arg0)
      .filter(k => !arr.includes(k))
      .reduce((acc, key) => (Object.assign(acc, { [key]: arg0[key] }), acc), {});
  }


  static getAllPropertiesDespcriptor(arg0: Record<string, unknown>): Record<string, PropertyDescriptor> {
    if (typeof arg0 !== 'object') throw new TypeError('ModelsCore.getAllPropertiesDespcriptor `arg0` must be an object')
    return ModelsCore.omit({
      ...Object.getOwnPropertyDescriptors(Object.getPrototypeOf(arg0)),
      ...Object.getOwnPropertyDescriptors(arg0)
    }, ModelsCore.DEFAULT_OMIT)
  }

  static filterPropertiesBy(props: Record<string, PropertyDescriptor>, fnFilters: (arg0: PropertyDescriptor) => boolean): Record<string, PropertyDescriptor> {
    if (typeof fnFilters !== 'function') throw new TypeError('ModelsCore.filterPropertiesBy `fnFilter` must be a function')
    const listPicks = {}

    for (const prop in ModelsCore.getAllPropertiesDespcriptor(props)) {
      const propDesc = props[prop]
      if (typeof propDesc !== 'object') continue;
      try {
        const result = fnFilters(propDesc)
        const boolResult = Boolean(result)
        if (boolResult) {
          Object.assign(listPicks, { [prop]: propDesc })
        }
      } catch (e) { }
    }

    return listPicks
  }

  static getAllMethods(props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, (desc) => Boolean(!desc.enumerable && typeof desc.set === 'undefined'))
  }

  static getAllSetters(props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, (desc) => Boolean(desc.set && typeof desc.set === 'function'))
  }

  static getBasicEnumerables(props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, (desc) => Boolean(desc.enumerable && !(desc.value && typeof desc.value === 'function')))
  }

  static getEnumerablesHasFunction(props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, (desc) => Boolean(
      desc.enumerable &&
      desc.value &&
      typeof desc.value === 'function' &&
      typeof desc.value.prototype === 'undefined'
    ))
  }

  static getEnumerablesInstanceOf(props: Record<string, PropertyDescriptor>, ofInstance: any) {
    return ModelsCore.filterPropertiesBy(props, (desc) => Boolean(
      desc.enumerable &&
      desc.value &&
      typeof desc.value === 'function' &&
      desc.value.prototype &&
      (desc.value.prototype instanceof ofInstance)
    ))
  }
}
