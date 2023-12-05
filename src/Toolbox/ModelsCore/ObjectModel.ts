import ModelsCore from './Core'

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

  static buildFromObj<T extends ObjectModel>(
    this: { new (): T },
    argObj: DefaultRecord,
    // remapper?: GetEnumerableFromInstance<T>
  ): T {
    const ModelToUse = this
    const newThis = new ModelToUse()
    console.log('buildFromObj : ', {fromInstance: this.name, argObj})

    const propsDesc = ModelsCore.getAllPropertiesDespcriptor(newThis)
    const enumsBasics = ModelsCore.getBasicEnumerables(propsDesc)
    const enumsLists = ModelsCore.getEnumerablesHasProtoListModel(propsDesc)
    const enumsObjectModels = ModelsCore.getEnumerablesHasProtoObjectModel(propsDesc)
    const enumsFunctions = ModelsCore.getEnumerablesHasFunction(propsDesc)
    const methods = ModelsCore.getAllMethods(propsDesc)
    const setters = ModelsCore.getAllSetters(propsDesc)

    for (const prop in enumsBasics) {
      const propDesc = enumsBasics[prop];
      ObjectModel.defineProperty(newThis, prop, propDesc, argObj[prop]);
    }

    for (const prop in enumsFunctions) {
      const propDesc = enumsFunctions[prop]
      ObjectModel.defineProperty(
        newThis,
        prop,
        propDesc,
        propDesc.value(argObj[prop])
      );
    }

    for (const prop in enumsObjectModels) {
      const propDesc = enumsObjectModels[prop]
      ObjectModel.defineProperty(
        newThis,
        prop,
        propDesc,
        propDesc.value.buildFromObj(argObj[prop])
      )
    }

    for (const prop in enumsLists) {
      const propDesc = enumsLists[prop]
      ObjectModel.defineProperty(
        newThis,
        prop,
        propDesc,
        propDesc.value.buildListFromArray(argObj[prop])
      )
    }

    Object.defineProperties(newThis, { ...setters, ...methods })

    for (const prop in setters) {
      newThis[prop] = argObj[prop]
    }

    return newThis
  }
}
