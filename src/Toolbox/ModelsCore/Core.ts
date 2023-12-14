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
    return ModelsCore.filterPropertiesBy(props, ModelsCore.isMethod)
  }

  static getAllSetters(props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, ModelsCore.isSetter)
  }

  static getBasicEnumerables(props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, ModelsCore.isBasicEnumable)
  }

  static getEnumerablesHasFunction(props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, ModelsCore.isEnumFunction)
  }

  static getEnumerablesInstanceOf(props: Record<string, PropertyDescriptor>, ofInstance: any) {
    return ModelsCore.filterPropertiesBy(props, (desc) => ModelsCore.isEnumInstanceOf(desc, ofInstance))
  }

  static isMethod(desc: PropertyDescriptor){
    return Boolean('enumerable' in desc && desc.enumerable === false && typeof desc.set === 'undefined');
  }

  static isBasicEnumable(desc: PropertyDescriptor){
    return Boolean(
      'enumerable' in desc &&
      'value' in desc &&
      !(typeof desc.value === 'function')
    );
  }

  static isSetter(desc: PropertyDescriptor) {
    return Boolean('set' in desc && typeof desc.set === 'function');
  }

  static isEnumFunction(desc: PropertyDescriptor){
    return Boolean(
      'enumerable' in desc &&
      desc.enumerable &&
      'value' in desc &&
      typeof desc.value === 'function' &&
      typeof desc.value.prototype === 'undefined'
    );
  }

  static isEnumInstanceOf(desc: PropertyDescriptor, ofInstance: any) {
    return Boolean(
      ('enumerable' in desc) &&
      ('value' in desc) &&
      typeof desc.value === 'function' &&
      desc.value.prototype &&
      (desc.value.prototype instanceof ofInstance)
    )
  }

  static v2Triage (props: Record<string, PropertyDescriptor>, triage: Record<string, (arg0: PropertyDescriptor) => boolean>) {
    const listPicks: Record<string, Record<string,PropertyDescriptor>> = {}

    const propsDesc = ModelsCore.getAllPropertiesDespcriptor(props);

    for (const prop in propsDesc) {
      const propDesc = propsDesc[prop]
      
      for (const tri in triage) {
        if (!(tri in listPicks)){
          Object.assign(listPicks, { [tri]: {} });
        }
        const triFn = triage[tri];
        try {
          const result = triFn(propDesc);
          if (result) {
            Object.assign(listPicks[tri], { [prop]: propDesc })
            continue;
          }
        } catch(e) {
          console.error('Error from v2Triage :', e);
        }
      }
    }

    return listPicks;
  }
}
