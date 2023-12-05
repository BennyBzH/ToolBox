import AdvenceModel from '../../../Toolbox/Classes/AdvenceModel/AdvenceModel';
import BaseModel from '../../../Toolbox/Classes/BaseModel/BaseModel';
import ObjectModel from './ObjectModel';

export default abstract class ListModel extends Array {
  #__CurrentModel = null

  constructor(Model) {
    super()
    this.#__CurrentModel = Model
  }

  static buildListFromArray(argArray: unknown[]) {
    if (!Array.isArray(argArray))
      throw new TypeError('buildListFromArray, argArray must be an Array type')

    const currentThis = this
    const newThis = new currentThis()
    const modelToUse = newThis.#__CurrentModel
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
