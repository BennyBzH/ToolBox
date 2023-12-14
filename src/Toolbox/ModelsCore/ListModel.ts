import ObjectModel from './ObjectModel';

export default abstract class ListModel extends Array {
  #__CurrentModel;

  constructor(Model: any) {
    super()
    this.#__CurrentModel = Model
  }

  static buildListFromArray<T extends ListModel>(
    this: { new (): T },
    argArray: unknown[]) {
    if (!Array.isArray(argArray))
      throw new TypeError('buildListFromArray, argArray must be an Array type')

    const NewThis = this
    const NewInstance = new NewThis()
    const modelToUse = NewInstance.#__CurrentModel
    const modelToUseIsInstanceOfObjectModel = modelToUse.prototype instanceof ObjectModel

    for (const itm of argArray) {
      if (modelToUseIsInstanceOfObjectModel) {
        NewInstance.push(modelToUse.buildFromObj(itm))
      } else {
        NewInstance.push(modelToUse(itm))
      }
    }

    return NewInstance
  }
}
