import { omit } from 'ramda'
import ObjectModel from './ObjectModel'
import ListModel from './ListModel'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class ModelsCore {
  static getAllPropertiesDespcriptor (obj: Record<string, unknown>): Record<string, PropertyDescriptor> {
    if (typeof obj !== 'object') {
      return Object.create(null)
    } else {
      return Object.getOwnPropertyDescriptors(obj)
    }
  }

  static filterPropertiesBy (props: Record<string, PropertyDescriptor>, fnFilters: (arg0: PropertyDescriptor) => boolean): Record<string, PropertyDescriptor> {
    if (typeof fnFilters !== 'function') throw new TypeError('filterProperties `fnFilter` must be a function')
    const listPicks = {}

    for (const prop in ModelsCore.getAllPropertiesDespcriptor(props)) {
      const propDesc = props[prop]
      const result = fnFilters(propDesc)
      const boolResult = Boolean(result)
      if (boolResult) {
        listPicks[prop] = propDesc
      }
    }

    return listPicks
  }

  static getAllMethods (props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, (desc) => (!desc.enumerable && typeof desc.set === 'undefined'))
  }

  static getAllSetters (props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, (desc) => (desc.set && typeof desc.set === 'function'))
  }

  static getBasicEnumerables (props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, (desc) => (desc.enumerable && !(desc.value && typeof desc.value === 'function')))
  }

  static getEnumerablesHasFunction (props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, (desc) => (
      desc.enumerable &&
      desc.value &&
      typeof desc.value === 'function' &&
      typeof desc.value.prototype === 'undefined'
    ))
  }

  static getEnumerablesHasProtoObjectModel (props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, (desc) => (
      desc.enumerable &&
      desc.value &&
      typeof desc.value === 'function' &&
      desc.value.prototype &&
      (desc.value.prototype instanceof ObjectModel)
    ))
  }

  static getEnumerablesHasProtoListModel (props: Record<string, PropertyDescriptor>) {
    return ModelsCore.filterPropertiesBy(props, (desc) => (
      desc.enumerable &&
      desc.value &&
      typeof desc.value === 'function' &&
      desc.value.prototype &&
      (desc.value.prototype instanceof ListModel)
    ))
  }
}
