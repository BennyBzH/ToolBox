import AdvenceModel from '../../../Toolbox/Classes/AdvenceModel/AdvenceModel';
import BaseModel from '../../../Toolbox/Classes/BaseModel/BaseModel';

export default abstract class ListModel extends Array {
  #__CurrentModel = null;

  constructor(Model: new (): T) {
    super();
    this.#__CurrentModel = Model;
  }

  static buildListFromArray(argArray: unknown[]) {
    if (!Array.isArray(argArray))
      throw new TypeError('buildListFromArray, argArray must be an Array type');

    const currentThis = this;
    const newThis = new currentThis();
    const modelToUse = newThis.#__CurrentModel;
    console.log(this.name, {argArray, modelToUse});
    const modelToUseIsInstanceOfBaseModel = modelToUse.prototype instanceof BaseModel || modelToUse.prototype instanceof AdvenceModel;
    console.log(modelToUseIsInstanceOfBaseModel)

    if (modelToUseIsInstanceOfBaseModel) {
      for (const itm of argArray) {
        newThis.push(modelToUse.buildFromObj(itm));
      }
      return newThis;
    } else if (typeof modelToUse === 'function') {
      for (const itm of argArray) {
        newThis.push(modelToUse(itm));
      }
    }

    return newThis;
  }
}
