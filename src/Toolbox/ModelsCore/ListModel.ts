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
    const newThis = new NewThis()
    const modelToUse = newThis.#__CurrentModel
    console.log({ this: this, newThis, modelToUse });
    const modelToUseIsInstanceOfObjectModel = modelToUse.prototype instanceof ObjectModel

    for (const itm of argArray) {
      if (modelToUseIsInstanceOfObjectModel) {
        newThis.push(modelToUse.buildFromObj(itm))
      } else {
        newThis.push(modelToUse(itm))
      }
    }

    return newThis
  }
}
