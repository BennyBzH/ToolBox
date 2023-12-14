import ModelsCore from './Core'
import ListModel from './ListModel'

type DefaultRecord = Record<string, unknown>

export default abstract class ObjectModel {

  private static defineProperty (
    target: any,
    prop: string,
    propDesc: PropertyDescriptor,
    value: any
  ) {
    Object.defineProperty(target, prop, {
      ...propDesc,
      value
    })
  }


  static OLD_buildFromObj<T extends ObjectModel>(
    this: { new (): T },
    argObj: DefaultRecord
    // remapper?: GetEnumerableFromInstance<T>
  ): T {
    const ModelToUse = this
    const NewInstance = new ModelToUse()
    const propsDesc = ModelsCore.getAllPropertiesDespcriptor(NewInstance)
    const enumsBasics = ModelsCore.getBasicEnumerables(propsDesc)
    const enumsLists = ModelsCore.getEnumerablesInstanceOf(propsDesc, ListModel)
    const enumsObjectModels = ModelsCore.getEnumerablesInstanceOf(propsDesc, ObjectModel)
    const enumsFunctions = ModelsCore.getEnumerablesHasFunction(propsDesc)
    const methods = ModelsCore.getAllMethods(propsDesc)
    const setters = ModelsCore.getAllSetters(propsDesc)

    for (const prop in enumsBasics) {
      const propDesc = enumsBasics[prop];
      ObjectModel.defineProperty(NewInstance, prop, propDesc, argObj[prop])
    }

    for (const prop in enumsFunctions) {
      const propDesc = enumsFunctions[prop]
      ObjectModel.defineProperty(
        NewInstance,
        prop,
        propDesc,
        propDesc.value(argObj[prop])
      )
    }

    for (const prop in enumsObjectModels) {
      const propDesc = enumsObjectModels[prop]
      ObjectModel.defineProperty(
        NewInstance,
        prop,
        propDesc,
        propDesc.value.OLD_buildFromObj(argObj[prop])
      )
    }

    for (const prop in enumsLists) {
      const propDesc = enumsLists[prop]
      ObjectModel.defineProperty(
        NewInstance,
        prop,
        propDesc,
        propDesc.value.buildListFromArray(argObj[prop])
      )
    }

    Object.defineProperties(NewInstance, { ...setters, ...methods })

    for (const prop in setters) {
      Object.assign(NewInstance, { [prop]: argObj[prop] })
    }

    return NewInstance
  }

  static buildFromObj<T extends ObjectModel>(
    this: { new (): T },
    argObj: DefaultRecord
  ): T {
    const ModelToUse = this
    const NewInstance = new ModelToUse()

    const listPicks = ModelsCore.v2Triage(NewInstance, {
      enumsBasics: ModelsCore.isBasicEnumable,
      enumsFunctions: ModelsCore.isEnumFunction,
      methods: ModelsCore.isMethod,
      setters: ModelsCore.isSetter,
      enumsLists: (desc) => ModelsCore.isEnumInstanceOf(desc, ListModel),
      enumsObjectModels: (desc) => ModelsCore.isEnumInstanceOf(desc, ObjectModel)
    })

    const { enumsBasics, enumsLists, enumsObjectModels, enumsFunctions, methods, setters } = listPicks

    for (const prop in enumsBasics) {
      const propDesc = enumsBasics[prop];
      ObjectModel.defineProperty(NewInstance, prop, propDesc, argObj[prop])
    }

    for (const prop in enumsFunctions) {
      const propDesc = enumsFunctions[prop]
      ObjectModel.defineProperty(
        NewInstance,
        prop,
        propDesc,
        propDesc.value(argObj[prop])
      )
    }

    for (const prop in enumsObjectModels) {
      const propDesc = enumsObjectModels[prop]
      ObjectModel.defineProperty(
        NewInstance,
        prop,
        propDesc,
        propDesc.value.buildFromObj(argObj[prop])
      )
    }

    for (const prop in enumsLists) {
      const propDesc = enumsLists[prop]
      ObjectModel.defineProperty(
        NewInstance,
        prop,
        propDesc,
        propDesc.value.buildListFromArray(argObj[prop])
      )
    }

    Object.defineProperties(NewInstance, { ...setters, ...methods })

    for (const prop in setters) {
      Object.assign(NewInstance, { [prop]: argObj[prop] })
    }

    return NewInstance
  }
}
