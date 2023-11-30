import AdvenceModel from '../../../Toolbox/Classes/AdvenceModel/AdvenceModel';
import BaseModel from '../../../Toolbox/Classes/BaseModel/BaseModel';

export default abstract class ListModel extends Array {
  #__CurrentModel = null;

  constructor(Model) {
    super();
    this.#__CurrentModel = Model;
  }

  static buildListFromArray(argArray: Object[]) {
    if (!Array.isArray(argArray))
      throw new TypeError('buildListFromArray, argArray must be an Array type');

    const currentThis = this;
    const newThis = new currentThis();
    const modelToUse = newThis.#__CurrentModel;
    const modelToUseIsInstanceOfBaseModel =
      modelToUse.prototype instanceof BaseModel ||
      modelToUse.prototype instanceof AdvenceModel;

    if (modelToUseIsInstanceOfBaseModel) {
      for (const itm of argArray) {
        newThis.push(modelToUse.buildFromObj(itm));
      }
      return newThis;
    }
  }
}
